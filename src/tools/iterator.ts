type RecordOrValue<T> = T | {[index: string]: RecordOrValue<T> | Array<RecordOrValue<T>>} ;
function getIfProperty<T> (object: RecordOrValue<T>, property: string): T[] | T | null {
  if (object && typeof object === 'object') {
    const val = object[property];
    return Array.isArray(val) ? val as T[]: val as T;
  }
  return null;
}
export function * deepIterator<T>(array: RecordOrValue<T>[], propsToFlatten: string[], replace?: boolean): IterableIterator<T> {
  let stack: RecordOrValue<T>[] = [];
  if (!Array.isArray(array)) {
    throw new Error('array must be supplied');
  }

  for (let currentValue of array) {
    if (extractToStackIfMatched(currentValue, propsToFlatten) && replace) {
      continue;
    }
    yield currentValue as T;
  }
  let currentValue: RecordOrValue<T> | undefined;
  /* eslint-disable-next-line no-cond-assign , require-atomic-updates */
  while (currentValue = stack.shift()) {
    if (extractToStackIfMatched(currentValue, propsToFlatten) && replace) {
      continue;
    }
    yield currentValue as T;
  }
  function extractToStackIfMatched (object: RecordOrValue<T>, properties?: string[]) {
    if (properties) {
      for (const propName of properties) {
        const propValue = getIfProperty(object, propName);
        if (propValue) {
          stack = stack.concat(propValue);
          return true;
        }
      }
    }
    return false;
  }
}

export function *serialIterator<T = any>(array: any[], props: string | string[]): IterableIterator<T> {
  let found = false;
  if (array) {
    array = makeArrayFromValue(array);
    const stack = array.slice();
    let item = null;
    /* eslint-disable-next-line no-cond-assign , require-atomic-updates */
    while (item = stack.shift()) {
      found = false;
      if (props) {
        props = makeArrayFromValue(props);
        for (const prop of props) {
          let propVal = getIfProperty(item, prop);
          if (propVal) {
            found = true;
            yield *serialIterator<T>(propVal, props);
          }
        }
      }
      if (!found) {
        yield item;
      }
    }
  }
}

function makeArrayFromValue(val: any): any[] {
  if (!Array.isArray(val)) {
    return [val];
  }
  return val;
}
