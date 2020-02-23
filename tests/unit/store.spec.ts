import { MappedSetStore, Store, MappedCounterStore } from '@/domainmodel/arch/abstract-store'
import {BehaviorSubject, Subject } from 'rxjs';
class SingleStore extends Store<string> {

  constructor() {
    super(new Subject<string>());
  }
  static clearInstancesForTest(){
    this.instances.clear();
  }
}
class TypeA extends Store<string> {

  constructor() {
    super(new Subject<string>());
  }
  static clearInstancesForTest(){
    this.instances.clear();
  }
}
class TypeB extends TypeA {

}
class TestSetStore extends Store<{set: Set<string> }> {
  curValue?: Set<string>;
  constructor(arr?: string[]) {
    super(new BehaviorSubject({set: new Set<string>(arr)}));
    this.getModel().subscribe((val) => {
      this.curValue = val.set;
    });
  }
}

class TestMapStore extends MappedSetStore<string, string> {
  curValue?: Map<string, TestSetStore>;
  constructor(map?: Map<string, TestSetStore>) {
    super(new BehaviorSubject({ map: map ? map : null}), (v) => {
      const val = v && typeof v === 'string' ? [v] : void 0;
      return new TestSetStore(val);
    })
    this.getModel().subscribe((val) => {
      if (val && val.map) {
        this.curValue = val.map;
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
      new TestSetStore();
    }
    it('should not throw an exception', () => {
      expect(instantiation).not.toThrow();
    })
    it('should have correct Map as model', () => {
      const setStore = new TestSetStore();
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
      expect(setStore && (setStore as TestSetStore).curValue).toBeDefined();
      const mdlSet = setStore && (setStore as TestSetStore).curValue;
      expect(mdlSet && mdlSet.has('v1')).toBeTruthy();
    });
    it('should allow to add new element without store (autocreate)', () => {
      const store = new TestMapStore();
      expect(store.curValue).toBeUndefined();
      store.addToSet("t2", "v2");
      expect(store.curValue).toBeDefined();
      const setStore = store.curValue && store.curValue.get('t2');
      expect(setStore && (setStore as TestSetStore).curValue).toBeDefined();
      const mdlSet = setStore && (setStore as TestSetStore).curValue;
      expect(mdlSet && mdlSet.has('v2')).toBeTruthy();
    });
    it('two value for same key', () => {
      const store = new TestMapStore();
      store.addToSet("t2", "v2");
      store.addToSet("t2", "v3");
      const setStore = store.curValue && store.curValue.get('t2');
      const mdlSet = setStore && (setStore as TestSetStore).curValue;
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
        mdl = new BehaviorSubject<any>({ map: new Map([['a1', counter]])});
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
    const i2 = SingleStore.getSingleInstance(SingleStore);
    expect(i1).toEqual(i2);
  })
  it('should auto instantiate', ()=>{
    const i1 = SingleStore.getSingleInstance(SingleStore);
    const i2 = SingleStore.getSingleInstance(SingleStore);
    expect(i1).toEqual(i2);
  })
});
describe('Inherited singleton', () => {
  afterEach(()=>{
    TypeA.clearInstancesForTest();
    TypeB.clearInstancesForTest();
  });
  it('should return different singletons for each type', () => {
    const i1 = new TypeA();
    const i2 = new TypeA();
    const i3 = TypeA.getSingleInstance(TypeA);
    const i4 = new TypeB();
    const i5 = TypeB.getSingleInstance(TypeB);

    expect(i1 === i2).toBeFalsy();
    expect(i1).toEqual(i3);
    expect(i2).toEqual(i3);
    expect(i2).toEqual(i3);
    expect(i3).not.toEqual(i5);
  });
  it('allows to get instance of any type from any type', () => {
    const ia = new TypeA();
    const ib = new TypeB();
    const ia1 = TypeB.getSingleInstance(TypeA);
    expect(ia === ia1).toBeTruthy();
  });
});
