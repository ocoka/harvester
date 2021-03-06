import * as React from 'react';
import { CoBarsMemo } from '@/components/shared/bars';
import { AvailableActions } from '@/domainmodel/arch/interfaces';
import { CoHarvestMemo } from './actions/harvest';

const availableActions = [

  {
    name: 'Process bookmars',
    id: 'harvest',
    icon: 'caterpillar-machine',
    content: CoHarvestMemo
  },
  {
    name: 'Settings',
    id: 'settings',
    icon: 'gear-1',
    content: null
  },
  {
    name: 'Experiments',
    id: 'experiments',
    icon: 'test-tube',
    content: null
  }

] as AvailableActions;

export function VmWorkbench() {
  return <>
    <CoBarsMemo items={availableActions}/>
  </>;
}
