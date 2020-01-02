import * as React from 'react';

/* this file contains all simple interfaces for models, it's like simple structures */
export interface AvailableAction {
  id: string;
  name: string;
  icon?: string;
  content: React.FunctionComponentFactory<any> | undefined | null
}
export type AvailableActions = AvailableAction[];

export interface ProcessStatus {
  itemsCount: number;
  itemsProcessed: number;
}

export interface FilterStore {
  tags: {
    exclude: Set<string>;
  }
}

export interface Notification {
  type: string;
  message: string;
}
export type NotificationList = Notification[];
export interface ElementAttribute {
  url: string;
  text: string;
}

export interface Bookmark {
  title: string;
  url: string | undefined;
}
