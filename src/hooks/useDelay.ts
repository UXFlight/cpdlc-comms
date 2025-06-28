import { useRef } from "react";

export function useDelay() {
  const timers = useRef<NodeJS.Timeout[]>([]);

  const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve();
      }, ms);
      timers.current.push(timer);
    });
  };

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  return { delay, clearAll };
}
