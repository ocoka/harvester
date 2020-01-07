import * as React from 'react';
import { memo } from 'react';
import './harvest.scss';
import { CoSwitchMemo, CoSwitchLightMemo } from '@/components/shared/switch';

export function CoHarvest() {
  return (
    <div className="o-page3 harvest">
      <div className="o-page3__work-area harvest__work-area">
        <div className="harvest__settings">
          <div className="harvest__controls">
            <button className="c-btn">Hei</button>
          </div>
        </div>
        <div className="harvest__errors"></div>
        <div className="harvest__words"></div>
      </div>
      <div className="o-page3__sidebar">
        <CoSwitchMemo/><CoSwitchMemo/><CoSwitchLightMemo/><CoSwitchLightMemo/>
      </div>
    </div>
  );
}

export const CoHarvestMemo = memo(CoHarvest);
