import { Subject, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { useRxBehaviour } from './seed/rx-aware-react-custom-hook';

let lambdaCounter = 1;

function getInvokerName(owner: Function, invoker: Function | string): string {
  const invokerName = typeof invoker === 'string' ? invoker : invoker.name;
  return `${owner.name}_${invokerName.length ? invokerName : `ƛ${lambdaCounter}`}`;
}
function prepare(e: any, callsites: any){
  return callsites;
}
function getCaller(f?: Function): Function | string | null {
  if (window.reactorTrace && 'captureStackTrace' in Error) {
    const e = {} as any;
    const oldPrepare = Error.prepareStackTrace;
    Error.prepareStackTrace = prepare;
    Error.captureStackTrace(e, f);
    const callSite = e.stack[0];
    let name = callSite.getTypeName();
    name = name ? `${name}.${callSite.getMethodName() || callSite.getFunctionName()}`: callSite.getFunction() ||callSite.getFunctionName();
    Error.prepareStackTrace = oldPrepare;
    return name;
  }
  return null;
}

export abstract class Loggable {
  protected log(text: string, caller?: Function | string | null) {
    if (window.reactorTrace) {
      console.log(`${new Date().toLocaleTimeString()}:${this.constructor.name}.${text} from '${caller ? caller : "unknown"}'`);
    }
  }
}

export abstract class Store<T> extends Loggable {

  public static holders = new Map<string, Function>();
  protected static instances = new Map<Function, Store<any>>();

  static getInstance(clz: Function & { instances: Map<Function, Store<any>>, holders: Map<string, Function | null> }): Store<any> | never  {
    if (!clz.instances.has(clz)) {
      throw new Error(`getInstance invoked before Store of class ${clz.name} was created !`);
    }
    const instance = clz.instances.get(clz);
    if (window.reactorTrace) {
      const caller = getCaller(this.getInstance);
      if (caller) {
        clz.holders.set(getInvokerName(clz, caller), typeof caller === 'string' ? null: caller);
      }
    }
    return instance!;
  }
  constructor (
    protected model: Subject<T>
  ) {
    super();
    const clz = this.constructor as any;
    if (window.reactorTrace) {
      const caller = getCaller(this.constructor);
      if (caller) {
        clz.holders.set(getInvokerName(clz, caller), caller);
      }
    }
    clz.instances.set(clz, this);
  }

  getState() {
    return useRxBehaviour<T>(this.model);
  }
  setState(value: T): void {
    this.log('setState()', getCaller(this.setState));
    this.model.next(value);
  }
  getModel(): Subject<T> {
    return this.model;
  }
}

export abstract class MappedStore<K,V> extends Store<Map<K, V> | null> {

  private _map: Map<K,V> | null = null;
  private _willNotify = false;
  protected _caller: Function | string | undefined | null;

  protected logSubscribed(caller?: Function | string | null) {
    this.log('"subscribed to model"', caller);
    this.model.subscribe((val) => {
      this.log('"got model"', caller);
      this._map = val;
    });
  }
  constructor(
    protected model: Subject<Map<K, V> | null>,
    protected newValue: (value?: unknown) => V) {
    super(model);
    this.logSubscribed(getCaller(this.constructor));
  }

  private _runWorkerNoNotify(bindedWorker: () => void) {
    this._willNotify = true;
    bindedWorker();
    this._willNotify = false;
  }

  private _notifyMapChange() {
    if (this._map && !this._willNotify) {
      this.model.next(this._map);
    }
  }

  private _initNewValue(map: Map<K, V>, key: K, value?: unknown): V {
    const val = this.newValue(value);
    map.set(key, val);
    return val;
  }

  protected doWorkOnMap(worker: (map: Map<K, V>) => void) {
    if (!this._map) {
      this.log('doWorkOnMap() ["new map"]', this._caller);
      this._map = new Map<K, V>();
      this._runWorkerNoNotify(worker.bind(this, this._map));
      this._notifyMapChange();
    } else {
      worker(this._map);
    }
  }
  protected doWorkOnValue(key: K, worker: (value: V) => void, newValue?: unknown): void {
    this.doWorkOnMap((map) => {
      const ss = map.get(key);
      if (!ss) {
        worker(this._initNewValue(map, key, newValue));
        this._notifyMapChange();
      } else {
        worker(ss);
      }
    });
  }
}
export type SetStore<T> = Store<Set<T>>;
export abstract class MappedSetStore<K, V> extends MappedStore<K, SetStore<V>> {
  addToSet = (key: K, newValue: V) => {
    this._caller = getCaller(this.addToSet);
    this.doWorkOnValue(key, (value) => {
      const model = value.getModel();
      model.pipe(first()).subscribe((curSet) => {
        curSet.add(newValue);
        model.next(curSet);
      });
    }, newValue);
  }
}
class NumberStore extends Store<number> {
}
export abstract class MappedCounterStore<K = string> extends MappedStore<K, Store<number>> {
  constructor(model: Subject<Map<K, Store<number>> | null >, newCounter: () => Subject<number>) {
    super(model, (v) => {
      return new NumberStore(newCounter());
    })
  }
  incrementKey = (key: K) => {
    this._caller = getCaller(this.incrementKey);
    this.doWorkOnValue(key, (value) => {
      const model = value.getModel();
      model.pipe(first()).subscribe((counter) => {
        model.next(counter ? ++counter: 0);
      });
    });
  }
}
