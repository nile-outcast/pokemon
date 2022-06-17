import { RefObject, useEffect } from 'react';

type AnyEvent = MouseEvent | TouchEvent;
type Handler = (event: AnyEvent) => void;

export const useOnClickOutside: <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
) => void = (ref, handler) => {
  useEffect(() => {
    const listener = (event: AnyEvent): Handler | undefined => {
      const el = ref?.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [ref, handler]);
};
