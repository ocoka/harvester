import { memo, useState, useEffect, ReactNode, createContext } from 'react';
import * as React from 'react';
import './indicator.scss';


export function CoIndicator(props: {
  state: string,
  alt: string
}) {
  return <span title={props.alt} className={'indicator ' + `indicator_${props.state}`}></span>
}

export const CoIndicatorMemo = memo(CoIndicator);
