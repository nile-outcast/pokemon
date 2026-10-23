import * as React from 'react';

type UseIntersectionObserverParams = IntersectionObserverInit & {
  fetchMoreFn: () => Promise<unknown>;
  hasMore: boolean;
  loading: boolean;
};

type UseIntersectionObserverResult<T extends Element> = {
  sentinelRef: React.RefObject<T>;
  isFetching: boolean;
  isLoading: boolean;
};

/**
 * Бесконечная прокрутка: вешает IntersectionObserver на элемент, к которому
 * возвращает sentinelRef, и вызывает fetchMoreFn при попадании его в область видимости.
 */
export const useIntersectionObserver = <T extends Element>({
  fetchMoreFn,
  hasMore,
  loading,
  root,
  rootMargin = '0px 0px 200px',
  threshold,
}: UseIntersectionObserverParams): UseIntersectionObserverResult<T> => {
  const sentinelRef = React.useRef<T>(null);
  const [isFetching, setIsFetching] = React.useState(false);

  const isLoading = loading || isFetching;

  React.useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([target]) => {
        if (target.isIntersecting && hasMore && !isLoading) {
          setIsFetching(true);

          fetchMoreFn().finally(() => {
            setIsFetching(false);
          });
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [fetchMoreFn, hasMore, isLoading, root, rootMargin, threshold]);

  return { sentinelRef, isFetching, isLoading };
};
