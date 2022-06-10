import { useRef } from 'react';

export function useDebounce(f: (str: string) => void, t: number): (str: string) => void {
  const lastCall = useRef<number>();

  let lastCallTimer: NodeJS.Timeout;

  return (args: string) => {
    const previousCall = lastCall.current;
    lastCall.current = Date.now();

    if (previousCall && lastCall.current - previousCall <= t) {
      clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => f(args), t);
  };
}
