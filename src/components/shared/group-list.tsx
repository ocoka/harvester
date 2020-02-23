import { Store, MappedSetStore, SetStore } from '@/domainmodel/arch/abstract-store';
import * as React from 'react';
import { memo, useRef, useState } from 'react';
import { HiLuxRef } from '../utils/hilux';
import './group-list.scss';
import { CoList } from './list';
import { ListElement } from '@/domainmodel/arch/interfaces';

type SimpleGroup<T> = {[i: string]: T[] | SetStore<T> };
type Group<T> = SimpleGroup<T> | MappedSetStore<string, T>;

export interface GroupList<T extends ListElement> {
  id: string;
  groups: Group<T>;
  onSelect?: (el: T) => void;
  listRender?: (el: T) => React.ReactNode;
}

export function CoGroupList<T extends ListElement>(props: GroupList<T>) {

  const elRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  let groups: [string, T[] | SetStore<T>][] = [];
  if (props.groups instanceof Store) {
    const someMap = props.groups.getState();
    if (someMap && someMap.map) {
      groups = Array.from(someMap.map.entries());
    }
  } else {
    groups = Object.entries(props.groups as SimpleGroup<T>);
  }
  HiLuxRef(`CoGroupList_${props.id}`, elRef);
  return <div className='group-list'>
  <input className='c-input' onChange={($ev)=> setSelected($ev.target.value)}></input>
  <div className='group-list__content' ref={elRef}>
    {
      groups.map(_ =>
        <dl className='group-list__group' key={_[0]}>
          <dt className='group-list__title'><span className='group-list__title-text'>{_[0]}</span></dt>
          <dd className='group-list__list'>
            <CoList id={`grLi${_[0]}`} elements={_[1]}/>
          </dd>
        </dl>
      )
    }
  </div>
  </div>;
}

export const CoGroupListMemo = memo(CoGroupList);
