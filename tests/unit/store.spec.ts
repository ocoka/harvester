import { MappedSetStore, Store, MappedCounterStore } from '@/domainmodel/arch/abstract-store'
import {BehaviorSubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
class SingleStore extends Store<string> {

  constructor() {
    super(new Subject<string>());
  }
  static getInstance() {
    if (!SingleStore.instances.has(SingleStore)) {
      SingleStore.instances.set(SingleStore, new SingleStore());
    }
    return SingleStore.instances.get(SingleStore)!;
  }
  static clearInstancesForTest(){
    this.instances.clear();
  }
}
class TestStore extends Store<Set<string>> {
  curValue?: Set<string>;
  constructor(arr?: string[]) {
    super(new BehaviorSubject(new Set<string>(arr)));
    this.getModel().subscribe((val) => {
      this.curValue = val;
    });
  }
}

class TestMapStore extends MappedSetStore<string, string> {
  curValue?: Map<string, Store<Set<string>>>;
  constructor(map?: Map<string, Store<Set<string>>>) {
    super(new BehaviorSubject(map ? map : null), (v) => {
      const val = v && typeof v === 'string' ? [v] : void 0;
      return new TestStore(val);
    })
    this.getModel().subscribe((val) => {
      if (val) {
        this.curValue = val;
      }
    });
  }
}

class TestIncrStore extends MappedCounterStore<string> {
}
class TestNumberStore extends Store<number> {
  mdl: BehaviorSubject<number>;
  constructor(init: number) {
    const mdl = new BehaviorSubject(init)
    super(mdl);
    this.mdl = mdl;
  }
}
describe('MappedSetStore', () => {
  describe('when instantiated', () => {
    function instantiation() {
      new TestMapStore(new Map());
      new TestStore();
    }
    it('should not throw an exception', () => {
      expect(instantiation).not.toThrow();
    })
    it('should have correct Map as model', () => {
      const setStore = new TestStore();
      const store = new TestMapStore(new Map());
      expect(setStore.curValue).toBeDefined();
      expect(store.curValue).toBeDefined();
      expect(store.curValue && store.curValue.size).toEqual(0);
    })
  })
  describe('when add element to set', () => {
    it('should allow to add new element to present store', () => {
      const store = new TestMapStore(new Map());``
      store.addToSet("t1", "v1");
      expect(store.curValue && store.curValue.has('t1')).toBeTruthy();
      const setStore = store.curValue && store.curValue.get('t1');
      expect(setStore && (setStore as TestStore).curValue).toBeDefined();
      const mdlSet = setStore && (setStore as TestStore).curValue;
      expect(mdlSet && mdlSet.has('v1')).toBeTruthy();
    });
    it('should allow to add new element without store (autocreate)', () => {
      const store = new TestMapStore();
      expect(store.curValue).toBeUndefined();
      store.addToSet("t2", "v2");
      expect(store.curValue).toBeDefined();
      const setStore = store.curValue && store.curValue.get('t2');
      expect(setStore && (setStore as TestStore).curValue).toBeDefined();
      const mdlSet = setStore && (setStore as TestStore).curValue;
      expect(mdlSet && mdlSet.has('v2')).toBeTruthy();
    });
    it('two value for same key', () => {
      const store = new TestMapStore();
      store.addToSet("t2", "v2");
      store.addToSet("t2", "v3");
      const setStore = store.curValue && store.curValue.get('t2');
      const mdlSet = setStore && (setStore as TestStore).curValue;
      expect(mdlSet && mdlSet.size).toEqual(2);
      expect(mdlSet && mdlSet.has('v2')).toBeTruthy();
      expect(mdlSet && mdlSet.has('v3')).toBeTruthy();
    });
    it('two keys added', () => {
      const store = new TestMapStore();
      store.addToSet("t2", "v2");
      store.addToSet("t3", "v3");
      expect(store.curValue && store.curValue.has('t3')).toBeTruthy();
      expect(store.curValue && store.curValue.has('t2')).toBeTruthy();
    });
  });
})
describe('MappedCounterStore', () => {
  describe('when instatiated with non empty arguments', () => {
    let incNew: Subject<number>;
    let counter: TestNumberStore;
    let mdl;
    let store: TestIncrStore;
    function incrFn  ()  {
      return incNew;
    }
    beforeEach(
      () => {
        incNew = new BehaviorSubject(0);
        counter = new TestNumberStore(4);
        mdl = new BehaviorSubject<Map<string, Store<number>> | null>(new Map([['a1', counter]]));
        store = new TestIncrStore(
          mdl,
          incrFn
        );
      }
    );
    it('should increment counter correctly', () => {
      store.incrementKey('a1');
      expect(counter.mdl.getValue()).toEqual(5);
    });
  });
});
describe('Implemented Store singleton', () => {
  afterEach(()=>{
    SingleStore.clearInstancesForTest();
  })
  it('should get already created instance', ()=>{
    const i1 = new SingleStore();
    const i2 = SingleStore.getInstance();
    expect(i1).toEqual(i2);
  })
  it('should auto instantiate', ()=>{
    const i1 = SingleStore.getInstance();
    const i2 = SingleStore.getInstance();
    expect(i1).toEqual(i2);
  })
});
