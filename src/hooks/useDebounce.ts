import * as React from 'react';

export const useDebounce = <T>(callback: (args: T) => void, delay: number): ((args: T) => void) => {
  const timer = React.useRef<ReturnType<typeof setTimeout>>();

  return React.useCallback(
    (args: T) => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => callback(args), delay);
    },
    [callback, delay],
  );
};
