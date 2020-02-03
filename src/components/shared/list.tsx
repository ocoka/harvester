import * as React from 'react';
import { useRef, FunctionComponent, useState } from 'react';
import { HiLuxRef } from '@/components/utils/hilux';
import './list.scss';
export interface ListElement {
  title: string;
}
export interface CoListProps<T extends ListElement> {
  id: string;
  elements: T[],
  render?: (el: T) => React.ReactNode,
  onSelect?: (el: T) => void
}
export function CoList<T extends ListElement>(props: CoListProps<T>) {
  const listRef = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  HiLuxRef(`CoList_${props.id}`, listRef);
  return <ul className='list' ref={listRef}>
    {
      props.elements.map((_, i) => (
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
