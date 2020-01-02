import * as React from 'react';
import * as dom from 'react-dom';
import './hilight.scss';
const store = new Map<string, number>();
const hz1 = 0, hz2 = 200;
export default function HiLux(name: string, component: React.Component) {
  if (!window.reactorTrace) return;
  const rc: number = getCounter(name);
  setTimeout(()=>{
    /* eslint-disable-next-line */
    const node = dom.findDOMNode(component);
    if (node && node instanceof Element) {
      setStyleAndAttr(node, rc);
    }
  },hz1)
}

export function HiLuxRef<T extends HTMLElement>(name: string, ref: React.RefObject<T>) {
  if (!window.reactorTrace) return;
  const rc: number = getCounter(name);
  setTimeout(()=>{
    if (ref.current) {
      setStyleAndAttr(ref.current, rc);
    }
  },hz1)
}
function getCounter(name: string): number {
  let rc: number = store.get(name) || 0;
  store.set(name, ++rc);
  return rc;
}

function setStyleAndAttr(node: Element, rc: number) {
  node.classList.add('hilight_fire', 'hilight');
  node.setAttribute('data-rc', rc.toString());
  setTimeout(() => {
    node.classList.remove('hilight_fire');
  }, hz2);
}
