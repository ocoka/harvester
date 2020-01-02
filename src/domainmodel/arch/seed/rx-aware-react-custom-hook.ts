import { Subject } from 'rxjs';
import { useState, useEffect, ReactNode } from 'react';

export function useRxBehaviour<T extends unknown>(src: Subject<T>) {
  const [data, setter] = useState<T>();
  useEffect(() => {
    const subs = src.subscribe(setter);
    console.log('subscribed');
    return () => {
      console.log('unsubscribed');
      subs.unsubscribe();
    }
  }, [src]);
  return data;
}
