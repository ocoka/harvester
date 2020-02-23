import { HiLuxRef } from '@/components/utils/hilux';
import { SetStore, Store } from '@/domainmodel/arch/abstract-store';
import * as React from 'react';
import { useRef, useState } from 'react';
import './list.scss';
import { ListElement } from '@/domainmodel/arch/interfaces';

export interface CoListProps<T extends ListElement> {
  id: string;
  elements: T[] | SetStore<T>,
  render?: (el: T) => React.ReactNode,
  onSelect?: (el: T) => void
}
export function CoList<T extends ListElement>(props: CoListProps<T>) {
  const listRef = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  let list = [] as T[];
  if (props.elements instanceof Store) {
    const someSet = props.elements.getState();
    if (someSet && someSet.set) {
      list = Array.from(someSet.set.values());
    }
  } else {
    list = props.elements as T[];
  }
  HiLuxRef(`CoList_${props.id}`, listRef);
  return <ul className='list' ref={listRef}>
    {
      list.map((_, i) => (
        <li className={`list__item ${i === selected ? 'list__item_selected': ''}`} key={i}  onClick={() => {setSelected(i); props.onSelect && props.onSelect(_)}}>
          {props.render ? props.render(_) : _.title}
        </li>
      ))
    }
  </ul>;
}

export const CoListMemo = React.memo(CoList);
export function getMemo<T extends ListElement>() {
  return React.memo<CoListProps<T>>(CoList as React.FC<CoListProps<T>>);
}
