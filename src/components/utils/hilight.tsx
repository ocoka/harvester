import * as React from 'react';
import './hilight.scss';
const store = new Map<string, number>();
export default function Highlight(name: string, childs: React.ReactNode) {
  const myref = React.createRef<HTMLDivElement>();
  let rc: number = store.get(name) || 0;
  store.set(name, ++rc);
  setTimeout(()=>{
    if (myref.current) {
      myref.current.classList.remove('hilight_fire');
    }
  })
  return (
    <div ref={myref} className={'hilight hilight_fire'} data-rc={++rc}>
      {childs}
    </div>
  )
}
