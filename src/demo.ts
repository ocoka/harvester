import { Store } from '@/domainmodel/arch/abstract-store';
import { Subject } from 'rxjs';

window.reactorTrace = true;
class TypeA extends Store<string> {
  constructor() {
    super(new Subject());
  }
}

class TypeB extends TypeA {}

const a = new TypeA();
const b = new TypeA();
const c = TypeA.getInstance(TypeA);

console.log(a === b);
console.log(b === c);
console.log(a === c);

const d = new TypeB();
const e = TypeB.getInstance(TypeB);
const f = TypeB.getInstance(TypeA);
const g = TypeA.getInstance(TypeB);
console.log(a === d);
console.log(a === e);
console.log(e === f);
console.log(e === g);
