import * as React from 'react';
import { useGetPokemonShapes } from 'src/apollo/queries/apollo-hooks';
import { Footer } from 'src/components';
import { useIntersectionObserver } from 'src/hooks';
import { dataValidation } from 'src/utils';
import styled from 'styled-components';

import { Shape } from './components/Shape';

const LIMIT = 5;

export const Legendaries = (): JSX.Element => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const { data, loading, fetchMore } = useGetPokemonShapes({
    limit: LIMIT,
    offset: 0,
  });

  const total = data?.pokemonshape_aggregate?.aggregate?.count ?? 0;
  const loaded = data?.pokemonshape.length ?? 0;
  const hasMore = loaded < total;

  const handleFetchMore = React.useCallback(() => {
    return fetchMore({ variables: { offset: loaded } });
  }, [fetchMore, loaded]);

  const { sentinelRef, isFetching } = useIntersectionObserver<HTMLDivElement>({
    fetchMoreFn: handleFetchMore,
    root: scrollContainerRef.current,
    hasMore,
    loading,
  });

  return (
    <Container ref={scrollContainerRef}>
      <Content>
        {dataValidation(data?.pokemonshape, LIMIT).map((shape, idx) => (
          <Shape key={shape?.id ?? `load-${idx}`} shape={shape} />
        ))}

        {isFetching && dataValidation([], 2).map((_, idx) => <Shape key={`fetch-${idx}`} />)}
      </Content>

      <Sentinel ref={sentinelRef} />

      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding-top: 40px;
  background-color: ${({ theme }) => theme.dynamicTheme.pageBG};
  overflow-y: scroll;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding-top: 24px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  flex: 1;
  margin-inline: auto;
  width: 100%;
  max-width: 1440px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    gap: 44px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    gap: 32px;
  }
`;

const Sentinel = styled.div`
  height: 1px;
  width: 100%;
`;
