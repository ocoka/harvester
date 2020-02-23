import { BehaviorSubject } from 'rxjs';
import { MappedSetStore, Store } from './arch/abstract-store';
import { ListElement } from '@/domainmodel/arch/interfaces';

class UrlSetStore extends Store<{set: Set<ListElement>}> {
  constructor(val?: ListElement) {
    const initSet = {
      set: val ? new Set([val]) : new Set<ListElement>()
    };
    super(new BehaviorSubject(initSet));
  }
}
function isListElement(_: any):_ is ListElement {
  return typeof _.title === 'string';
}
const initFn = (_?: unknown) => {
  if (_) {
    if (typeof _ === 'string') {
      return new UrlSetStore({ title: _});
    }
    if (isListElement(_)) {
      return new UrlSetStore(_);
    }
  }
  return new UrlSetStore();
}
export class ReportErrorForHTTPCode extends MappedSetStore<string, ListElement> {
  constructor(init?: {key: string, val: ListElement}) {
    let initMap;
    if (init) {
      initMap = new Map([[init.key, initFn(init.val)]]);
    } else {
      initMap = new Map();
    }
    super(new BehaviorSubject<{map: Map<string, UrlSetStore> | null}>({map: initMap}), initFn);
  }
}
