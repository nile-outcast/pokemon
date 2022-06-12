import { useRef } from 'react';

export const useDebounce = <T>(f: (args: T) => void, t: number): (args: T) => void => {
  const lastCall = useRef<number>();

  let lastCallTimer: NodeJS.Timeout;

  return (args: T) => {
    const previousCall = lastCall.current;
    lastCall.current = Date.now();

    if (previousCall && lastCall.current - previousCall <= t) {
      clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => f(args), t);
  };
};
