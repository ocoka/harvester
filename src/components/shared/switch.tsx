import * as React from 'react';
import { memo, useState } from 'react';
import './switch.scss';

export interface CoSwitchModel {
  value?: boolean;
  onChange?: (val: boolean) => void
}

export function CoSwitch(prop: CoSwitchModel) {
  const [pos, setPos] = useState(prop.value || false);
  return <div className='switch' onClick={() => {const newPos = !pos; setPos(newPos); prop.onChange && prop.onChange(newPos)}}>
    <svg version="1.1" viewBox="0 0 30 50">
      <defs>
        <linearGradient id="linearGradient27492" x1="15" x2="15" y1="41.5" y2="42.4" gradientTransform="matrix(1,0,0,1.08,0,-3.79)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffbfb" offset="0"/>
          <stop stopColor="#7e312f" offset="1"/>
        </linearGradient>
        <linearGradient id="linearGradient27492-3" x1="15" x2="15" y1="41" y2="46.1" gradientTransform="matrix(1 0 0 .19 .1 37.1)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffbfb" offset="0"/>
          <stop stopColor="#887677" offset=".35"/>
          <stop stopColor="#000000" offset="1"/>
        </linearGradient>
        <linearGradient id="linearGradient27542" x1="15" x2="15" y1="10" y2="4" gradientTransform="matrix(1 0 0 .805 .1 .772)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" offset="0"/>
          <stop stopColor="#f8b4b8" offset=".079"/>
          <stop stopColor="#f8b4b8" offset=".866"/>
          <stop stopColor="#151515" offset="1"/>
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="29" height="49" fill="none" stroke="#adadad" strokeWidth="2"/>
      <rect x="1" y="1" width="27" height="47" fill="none" stroke="#fcfcfc" strokeWidth="2"/>
      <rect x="1" y="1" width="28" height="48" fill="#e9eded"/>
      <rect x="4" y="4" width="22" height="42" ry="2" fill="#f04639" />

      <g transform="matrix(.713 0 0 .969 5.3 -2.32)" fill="#f2f2f2" aria-label="I">
        <path d="m11.5 8.64h4.2v13.36h-4.2z" strokeWidth="1.205"/>
      </g>
      <g transform="matrix(.796 0 0 .758 2.77 7.23)" fill="#f2f2f2" aria-label="O">
        <path d="m9.08 34q0-3.2 1.82-5.1 1.8-1.8 5.1-1.8t5.1 1.8 1.8 5q0 2.4-.8 3.9t-2.2 2.3q-1.5.8-3.8.8-2.2 0-3.7-.7t-2.4-2.3q-.92-1.5-.92-3.9zm4.12 0q0 2.1.8 3 .7.8 2 .8t2.1-.8q.7-.9.7-3.1 0-1.9-.8-2.8-.7-.9-2-.9t-2 .9q-.8.9-.8 2.9z" strokeWidth="1.289"/>
      </g>
      <rect x="4" y="23" width="22" height="18" fill="#f8b4b8" opacity=".382" />
      <path d="m9 40.8h10.8c2.2 0 6.2.2 6.2.2v3.4c0 .7-1 1.5-1.7 1.5h-18.81c-.66 0-1.49-1-1.49-1.7l.02-3.2c3.02-.1 4.32-.2 4.98-.2z" fill="url(#linearGradient27492)" opacity=".382" />
      <g className='switch__state' style={{opacity: pos ? "0": "1"}}>
        <rect x="1" y="1" width="29" height="49" fill="none" stroke="#adadad" strokeWidth="2"/>
        <rect x="1" y="1" width="27" height="47" fill="none" stroke="#fcfcfc" strokeWidth="2"/>
        <rect x="1" y="1" width="28" height="48" fill="#e9eded"/>
        <rect x="4" y="4" width="22" height="42" ry="2" fill="#f04639" />
        <g transform="matrix(.713 0 0 .674 5.3 4.33)" fill="#f2f2f2" aria-label="I">
          <path d="m11.5 8.64h4.2v13.36h-4.2z" strokeWidth="1.445"/>
        </g>
        <g transform="matrix(.796 0 0 .883 2.75 4.16)" fill="#f2f2f2" aria-label="O">
          <path d="m9.08 34q0-3.2 1.82-5.1 1.8-1.8 5.1-1.8t5.1 1.8 1.8 5q0 2.4-.8 3.9t-2.2 2.3q-1.5.8-3.8.8-2.2 0-3.7-.7t-2.4-2.3q-.92-1.5-.92-3.9zm4.12 0q0 2.1.8 3 .7.8 2 .8t2.1-.8q.7-.9.7-3.1 0-1.9-.8-2.8-.7-.9-2-.9t-2 .9q-.8.9-.8 2.9z" strokeWidth="1.194"/>
        </g>
        <path d="m4 5.52c0-.72 1-1.53 2-1.53 3 0 13-.08 18 0 2 0 2 .81 2 1.61v3.3h-22z" fill="url(#linearGradient27542)" opacity=".382" />
        <path d="m9 45h17l-1 .6c0 .1 0 .3-1 .3h-18c-1 0-1-.5-1-.5l-1-.4z" fill="url(#linearGradient27492-3)" opacity=".382" />
        <rect x="4" y="8.91" width="22" height="15.4" ry=".481" fill="#b12e24" opacity=".382" />
      </g>
        <rect x="4" y="4" width="22" height="42" opacity='.5' ry="2" strokeWidth='1' stroke="black" fill="none"/>
    </svg>
  </div>;
}

export function CoSwitchLight(prop: CoSwitchModel) {
  const [pos, setPos] = useState(prop.value || false);
  return <div className='switch-light' onClick={() => {const newPos = !pos; setPos(newPos); prop.onChange && prop.onChange(newPos)}}>
    <svg viewBox="0 0 105 62" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="Checkerboard" width="1" height="1"  patternTransform="scale(9)" patternUnits="userSpaceOnUse">
          <rect transform="skewY(25)" x="0" width="1" height="1" fill="#afafaf"/>
          <rect transform="skewY(-25) skewX(0)" x="0" width="1" height="1" fill="white"/>
          <rect transform="skewX(65)" x="0" width="1" height="1" fill="#dcdcdc"/>
        </pattern>
        <radialGradient id="outMetalRadial" cx="63.6" cy="15" r="59.5" gradientTransform="matrix(1.35 .256 -.04 .276 -29.6 -3.21)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#000000" offset="0"/>
          <stop stopColor="#000000" stopOpacity=".1" offset="0.5"/>
          <stop stopColor="#000000" stopOpacity="0" offset="0.7"/>
        </radialGradient>
        <radialGradient id="reflectorStroke" cx="-53.921" cy="121.422" r="40" gradientTransform="matrix(0.625023, -1.365723, 1.494445, 0.681192, -71.753348, -118.368023)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopOpacity='.5'/>
          <stop offset="1" stopOpacity='.5' stopColor = "rgb(255, 255, 255)"/>
        </radialGradient>
        <radialGradient id="baseStroke2" gradientTransform="scale(1)" spreadMethod="pad" cx="1" cy="1" r="1.3" gradientUnits="objectBoundingBox">
          <stop stopColor="#ffffff" stopOpacity="0.1" offset="0"/>
          <stop stopColor="#ffffff" stopOpacity=".7" offset="0.5"/>
          <stop stopColor="#000000" stopOpacity=".4" offset="0.75"/>
          <stop stopColor="#ffffff" stopOpacity=".4" offset="0.8"/>
          <stop stopColor="#000000" stopOpacity=".7" offset="1"/>
        </radialGradient>
        <linearGradient id='baseStroke' gradientUnits="objectBoundingBox" x1='0' x2='1'>
          <stop stopColor="#000000" stopOpacity=".5" offset="0"/>
          <stop stopColor="#ffffff" stopOpacity=".7" offset=".6"/>
          <stop stopColor="#000000" stopOpacity=".5" offset="1"/>
        </linearGradient>
        <clipPath id="cp">
          <rect x="11" y="8" width="80" height="40" rx="4"/>
        </clipPath>
        <filter id="gaussian-blur-filter-0" colorInterpolationFilters="sRGB" x="-500%" y="-500%" width="1000%" height="1000%">
          <feGaussianBlur stdDeviation="1.7 1.7" edgeMode="none"/>
        </filter>
      </defs>
      <ellipse transform="matrix(.966 .257 -.198 .98 0 0)" cx="52.7" cy="13.8" rx="68.6" ry="36.1" fill="url(#outMetalRadial)"/>
      <rect x="11" y="8" width="80" height="40" rx="4" strokeWidth="3" vectorEffect='non-scaling-stroke' fill="#332f2a" stroke="url(#baseStroke)"/>
      <g clipPath="url(#cp)" className='switch-light__state' style = { pos ? { transform: "scale(0.97) translate(2px, 2px)"} : undefined }>
        <rect x="11" y="8" width="80" height="40" rx="4" fill="#ffa500"/>
        <rect x="11" y="8" width="80" height="40" rx="4" fill="url(#Checkerboard)" fillOpacity=".3" strokeWidth="3" vectorEffect='non-scaling-stroke' stroke="url(#reflectorStroke)"/>
      </g>
      { pos ? <rect fill = 'rgb(255, 191, 0)' x="10" y="7" width="80" height="40" rx="4" style={{
        filter: 'url(#gaussian-blur-filter-0)',
        mixBlendMode: 'hard-light',
        isolation: 'isolate',
      }} /> : null }
    </svg>
  </div>;
}
export const CoSwitchMemo = memo(CoSwitch);
export const CoSwitchLightMemo = memo(CoSwitchLight);
