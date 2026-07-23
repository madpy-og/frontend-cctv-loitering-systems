import { useEffect } from 'react';

export const usePolling = (callback: () => void, intervalMs: number, deps: any[] = []) => {
  useEffect(() => {
    callback(); // Initial call
    const interval = setInterval(callback, intervalMs);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
