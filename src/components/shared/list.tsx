import * as React from 'react';
import { useRef, FunctionComponent } from 'react';
import { HiLuxRef } from '@/components/utils/hilux';
import './list.scss';
interface ListElement {
  title: string;
}
export interface CoListProps<T extends ListElement> {
  id: string;
  elements: T[],
  render?: (el: T) => React.ReactNode
}
export function CoList<T extends ListElement>(props: CoListProps<T>) {
  const listRef = useRef<HTMLUListElement>(null);
  HiLuxRef(`CoList_${props.id}`, listRef);
  return <ul className='list' ref={listRef}>
    {
      props.elements.map((_, i) => (
        <li className='list__item' key={i} >
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
