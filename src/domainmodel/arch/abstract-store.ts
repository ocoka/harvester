import { Subject, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { useRxBehaviour } from './seed/rx-aware-react-custom-hook';

window.reactorTrace = true;
let lambdaCounter = 1;

function getInvokerName(owner: Function, invoker: Function | string): string {
  const invokerName = typeof invoker === 'string' ? invoker : invoker.name;
  return `${owner.name} <- ${invokerName.length ? invokerName : `ƛ${lambdaCounter}`}`;
}
function prepare(e: any, callsites: any){
  return callsites;
}
function getCaller(f?: Function, depth = 0): Function | string | null {
  if (window.reactorTrace && 'captureStackTrace' in Error) {
    const e = {} as any;
    const oldPrepare = Error.prepareStackTrace;
    Error.prepareStackTrace = prepare;
    Error.captureStackTrace(e, f);
    const callSite = e.stack[depth];
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
      console.log(`[${new Date().toLocaleTimeString()}] ${this.constructor.name}${text[0]==='"' || text[0]==='\'' ? " -> " : "."}${text} from '${caller ? caller : getCaller(this.log, 1)}'`);
    }
  }
  protected static log(text: string, caller?: Function | string | null) {
    if (window.reactorTrace) {
      console.log(`[${new Date().toLocaleTimeString()}] ${this.name}${text[0]==='"' || text[0]==='\'' ? " -> " : "::"}::${text} from '${caller ? caller : getCaller(this.log, 1)}'`);
    }
  }
}

type Constructor<R> = (new () => R);
export abstract class Store<T> extends Loggable {

  public static instances = new Map<Function, any>();

  static getSingleInstance<R>(clz: Constructor<R>): R  {
    if (!this.instances.has(clz)) {
      // throw new Error(`getSingleInstance invoked before Store of class ${clz.name} was created !`);
      // earlier client should call constructor by himself
      this.instances.set(clz, new clz());
    }
    if (window.reactorTrace) {
      const caller = getCaller(this.getSingleInstance);
      if (caller) {
        this.log(`getSingleInstance()`, caller);
      }
    }
    const instance = this.instances.get(clz);
    return instance! as R;
  }

  constructor (
    protected model: Subject<T>
  ) {
    super();
    const clz = this.constructor as any;
    if (window.reactorTrace) {
      const caller = getCaller(this.constructor);
      if (caller) {
        this.log('constructed', caller);
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

export abstract class MappedStore<K,V> extends Store<{map: Map<K, V> | null}> {

  private _map: Map<K,V> | null = null;
  private _willNotify = false;

  protected subscribeToGetMap() {
    this.model.subscribe((val) => {
        this._map = val.map;
    });
  }
  constructor(
    protected model: Subject<{map: Map<K, V> | null}>,
    protected newValue: (value?: unknown) => V) {
    super(model);
    this.subscribeToGetMap();
  }

  private _runWorkerNoNotify(bindedWorker: () => void) {
    this._willNotify = true;
    bindedWorker();
    this._willNotify = false;
  }

  private _notifyMapChange() {
    if (this._map && !this._willNotify) {
      this.model.next({map: this._map});
    }
  }

  private _initNewValue(map: Map<K, V>, key: K, value?: unknown): V {
    const val = this.newValue(value);
    map.set(key, val);
    return val;
  }

  protected doWorkOnMap(worker: (map: Map<K, V>) => void) {
    if (!this._map) {
      this.log('doWorkOnMap() [new map]');
      this._map = new Map<K, V>();
      this._runWorkerNoNotify(worker.bind(this, this._map));
      this._notifyMapChange();
    } else {
      this.log('doWorkOnMap() [exist map]');
      worker(this._map);
    }
  }
  protected doWorkOnValue(key: K, worker: (value: V) => void, newValue?: unknown): void {
    const caller = getCaller(this.doWorkOnValue);
    this.doWorkOnMap((map) => {
      const ss = map.get(key);
      if (!ss) {
        this.log('doWorkOnValue()=>"worker" [new set]', caller);
        worker(this._initNewValue(map, key, newValue));
        this._notifyMapChange();
      } else {
        this.log('doWorkOnValue()=>"worker" [exist set]', caller);
        worker(ss);
      }
    });
  }
}
export type SetStore<T> = Store<{set: Set<T>}>;
export abstract class MappedSetStore<K, V> extends MappedStore<K, SetStore<V>> {
  addToSet = (key: K, newValue: V) => {
    this.doWorkOnValue(key, (value) => {
      const model = value.getModel();
      model.pipe(first()).subscribe((curSet) => {
        curSet.set.add(newValue);
        model.next({set: curSet.set});
      });
    }, newValue);
  }
}
class NumberStore extends Store<number> {
}
export abstract class MappedCounterStore<K = string> extends MappedStore<K, NumberStore> {
  constructor(model: Subject<{map: Map<K, NumberStore> | null}>, newCounter: () => Subject<number>) {
    super(model, () => {
      return new NumberStore(newCounter());
    })
  }
  incrementKey = (key: K) => {
    this.doWorkOnValue(key, (value) => {
      const model = value.getModel();
      model.pipe(first()).subscribe((counter) => {
        model.next(counter ? ++counter: 0);
      });
    });
  }
}
