import { BehaviorSubject } from 'rxjs';
import { MappedSetStore, Store } from './arch/abstract-store';

class UrlSetStore extends Store<Set<string>> {
  constructor(val?: string) {
    super(new BehaviorSubject(new Set(val)));
  }
}
export class ReportErrorForHTTPCode extends MappedSetStore<string, string> {
  constructor() {
    super(new BehaviorSubject<Map<string, UrlSetStore> | null>(new Map()), (_?: unknown) => {
      if (_ && typeof _ === 'string') {
        return new UrlSetStore(_);
      }
      return new UrlSetStore();
    });
  }
}
