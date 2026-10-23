import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGetPokemons } from 'src/apollo/queries/apollo-hooks';
import { Footer } from 'src/components';
import { TitleH3 } from 'src/components/ui';
import { useIntersectionObserver } from 'src/hooks';
import { dataValidation } from 'src/utils';
import styled from 'styled-components';

import { Filters, PokemonCard, PokemonCardModal } from './components';
import { buildQueryString, useQueryParams } from './queryParams';

export const Pokedex = (): React.ReactElement => {
  const [limit, setLimit] = React.useState(document.documentElement.clientWidth > 768 ? 21 : 20);

  React.useLayoutEffect(() => {
    const getWidth = (): void => setLimit(document.documentElement.clientWidth > 768 ? 21 : 20);
    getWidth();

    window.addEventListener('resize', getWidth);

    return () => window.removeEventListener('resize', getWidth);
  }, []);

  const params = useQueryParams();

  const history = useHistory();

  // Отражаем фильтры в адресной строке. replace не засоряет историю:
  // дозагрузка страниц params не меняет, поэтому лишних записей не будет.
  React.useEffect(() => {
    history.replace(`${history.location.pathname}${buildQueryString(params)}`);
  }, [history, params]);

  const gridContainerRef = React.useRef<HTMLDivElement>(null);

  // Объект params меняется только при смене фильтров, поэтому сброс скролла
  // привязан к нему, а не к offset: дозагрузка страниц его не трогает.
  React.useEffect(() => {
    gridContainerRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [params]);

  const { data, loading, fetchMore } = useGetPokemons({
    limit: limit,
    ...params,
  });

  const total = data?.pokemon_aggregate?.aggregate?.count ?? 0;
  const loaded = data?.pokemon.length ?? 0;
  const hasMore = loaded < total;

  const handleFetchMore = React.useCallback(() => {
    return fetchMore({ variables: { offset: loaded } });
  }, [fetchMore, loaded]);

  const { sentinelRef, isFetching } = useIntersectionObserver<HTMLDivElement>({
    fetchMoreFn: handleFetchMore,
    root: gridContainerRef.current,
    hasMore,
    loading,
  });

  const [activePokemonId, setActivePokemonId] = React.useState<number | null>(null);
  const handleCloseModal = React.useCallback(() => {
    setActivePokemonId(null);
  }, []);

  return (
    <>
      {activePokemonId && <PokemonCardModal id={activePokemonId} closeModal={handleCloseModal} />}

      <Container>
        <Content>
          <Filters />

          {!loading && data?.pokemon.length === 0 ? (
            <Notification>Incorrect filters</Notification>
          ) : (
            <GridContainer ref={gridContainerRef}>
              {dataValidation(data?.pokemon, limit).map((pokemon, idx) => (
                <PokemonCard
                  key={pokemon?.id ?? `load-${idx}`}
                  pokemon={pokemon}
                  onClick={setActivePokemonId}
                />
              ))}
              {isFetching &&
                dataValidation([], 6).map((_, idx) => <PokemonCard key={`fetch-${idx}`} />)}
              <Sentinel ref={sentinelRef} />
            </GridContainer>
          )}
        </Content>

        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.dynamicTheme.pageBG};
  overflow: hidden;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    & > :last-child {
      display: none;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  flex: 1;
  padding: 73px 158px 0;
  width: 100%;
  max-width: 1440px;
  overflow: hidden;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 27px 24px 0;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    padding: 20px 20px 0;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: min-content;
  gap: 45px 34px;
  margin-top: 50px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 18px;
    margin-top: 80px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
    margin-top: 30px;
  }
`;

const Notification = styled(TitleH3)`
  margin: 50px 0 30px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: 80px 0 50px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    margin: 30px 0;
  }
`;

const Sentinel = styled.div`
  height: 1px;
  width: 100%;
  grid-column: 1 / -1;
`;
