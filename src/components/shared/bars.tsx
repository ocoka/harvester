import { memo, useState, useEffect, ReactNode, createContext  } from 'react';
import * as React from 'react';
import { useRef } from 'react';
import { HiLuxRef } from '@/components/utils/hilux';
import './bars.scss';

export type BarId = string;
export interface Bar {
  icon?: string;
  name: string;
  id: BarId;
  content: React.FunctionComponentFactory<any> | undefined | null
}
export interface BarsProps {
  items: Bar[],
}

export interface BarsContext {
  activeId: BarId;
}
export const BarsContext = createContext<BarsContext>({activeId: ''});
/* TODO: dead code, leave here just as hints for style manipulation with React hooks and Refs */
function useFixedWidthWithState<T extends unknown>(initValue: T, ref: React.RefObject<HTMLElement>) {
  if (ref.current) {
    console.log(`before tout : ${ref.current.getBoundingClientRect().width}`);
    ref.current.style.width = '';
    let elToStyle = ref.current;
    setTimeout(()=>{
      console.log(`after tout : ${elToStyle.getBoundingClientRect().width}`);
      elToStyle.style.width = `${elToStyle.getBoundingClientRect().width}px`;
    }, 10)
  } else {
    console.log('no refs')
  }
  return useState(initValue);
}

export function CoBars(props: BarsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

/*  useEffect(()=>{
    setTimeout(() => {
    if (ref.current) {
      let el = ref.current.querySelector('.bars__content:not(bars__content_hide)');
      let els = ref.current.querySelectorAll('.bars__content');
      if (el != null && els) {
        els.forEach(_ => {
          let dom = _ as HTMLElement;
          dom.style.width = el ? el.getBoundingClientRect().width + 'px' : '';
        })
      }
    }}, 100);
  }, [props.items]);
*/
  HiLuxRef('CoBars', ref);
  // const [activeId, setActiveId] = useFixedWidthWithState(props.items[0].id, ref2);
  const [activeId, setActiveId] = useState(props.items[0].id);
  return <div className='bars' ref={ref}>
    <BarsContext.Provider value={{activeId}}>
      {props.items.map(_ =>
        <div className={`bars__el ${activeId === _.id ? "bars__el_active" : ""}`} key={_.id}>
          <div className='bars__bar' onClick={() => {setActiveId(_.id)}}>
            <div className={`c-ico c-ico_l c-ico_${_.icon}`} />
            <div className='bars__name'>{_.name}</div>
          </div>
          <div className='bars__content' ref={activeId === _.id ? ref2 : null }>
            { _.content ? <_.content/> : false }
          </div>
        </div>
      )}
    </BarsContext.Provider>
  </div>;
}

export const CoBarsMemo = memo(CoBars);
