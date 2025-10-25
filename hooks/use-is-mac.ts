import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

function getSnapshot() {
  if (typeof navigator === 'undefined') return false;
  const { userAgent } = navigator;
  return /mac/i.test(userAgent);
}

export function useIsMac() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
