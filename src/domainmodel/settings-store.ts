import { Settings } from './arch/interfaces';
import { Store } from './arch/abstract-store';
import { BehaviorSubject } from 'rxjs';
export class SettingsStore extends Store<Settings> {
    constructor() {
      super(new BehaviorSubject<Settings>({
        maxHttpProcess: 3
      }))
    }
}
