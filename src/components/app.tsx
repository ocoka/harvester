import { memo, useState, useEffect, ReactNode, createContext  } from 'react';
import * as React from 'react';
import { useRef } from 'react';
import { HiLuxRef } from '@/components/utils/hilux';
import { loadDefaultTheme, changeTheme } from '@/services/theme_loader2';
import './app.scss';
import { VmWorkbench } from './vm/workbench';
import { CoSwitchLightMemo, CoSwitchMemo } from './shared/switch';

loadDefaultTheme();
export function CoApp() {
  const themes = ['main', 'forest', 'white'];
  const [trace, setTrace] = useState(window.reactorTrace);
  const myRef = useRef<HTMLDivElement>(null)
  HiLuxRef('app', myRef);
  return (
    <div className='app o-centered' ref={myRef}>
      <div className='app__header o-centered__cont'>
        -= Bookmark Harvester ( ver: 0.0.1.pre-alpha ) =-
      </div>
      <div className='app__content o-centered__cont o-centered__cont_full'>
        <VmWorkbench/>
      </div>
      <div className='app__footer o-centered__cont'>
        <section>
          <h6 className='c-fan-head'>Available color themes:</h6>
          {themes.map(_ => <span className='app__theme-click' onClick={() => { changeTheme(_) }} key={_}>{_}</span>)}
        </section>
        <section>
          <h6 className='c-fan-head'>React Render Tracing:</h6>
          <CoSwitchMemo value={trace} onChange={(newVal) => { console.log(`Tracing state: ${newVal}`); window.reactorTrace = newVal; setTrace(newVal) }} />
        </section>
      </div>
    </div>
  );
};

export const CoAppMemo = memo(CoApp);
