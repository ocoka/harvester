import { useState, useCallback } from 'react';

export function useRefresh() {
  const refresher = useState<any>()[1];
  return () => refresher({});
}
