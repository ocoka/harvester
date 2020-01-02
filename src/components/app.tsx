import { memo, useState, useEffect, ReactNode, createContext  } from 'react';
import * as React from 'react';
import { useRef } from 'react';
import { HiLuxRef } from '@/components/utils/hilux';
import { loadTheme } from '@/services/theme_loader2';
import './app.scss';

export function CoApp() {
  const myRef = useRef<HTMLDivElement>(null)
  HiLuxRef('app', myRef);
  const themes = ['main', 'forest', 'white'];
  return (
    <div className='app o-centered' ref={myRef}>
      <div className='app__header o-centered__cont'>
      </div>
      <div className='app__content o-centered__cont o-centered__cont_full'>
      </div>
      <div className='app__footer o-centered__cont'>
        <section>
          <h6 className='c-fan-head'>Available color themes:</h6>
          {themes.map(_ => <span className='app__theme-click' onClick={() => { loadTheme(_) }} key={_}>{_}</span>)}
        </section>
      </div>
    </div>
  );
};

export const CoAppMemo = memo(CoApp);
