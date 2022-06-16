import React, { UIEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGetPokemons } from 'src/apollo/queries/apollo-hooks';
import { useDebounce } from 'src/hooks';
import { dataValidation } from 'src/utils';
import styled from 'styled-components';

import { TitleH3 } from '../ui';
import { PokemonCard, SearchFilter } from './components';
import { setQueryParams, useQueryParams } from './queryParams';

export const Pokedex = (): React.ReactElement => {
  const [limit, setLimit] = useState(document.documentElement.clientWidth > 768 ? 21 : 10);

  useLayoutEffect(() => {
    const getWidth = (): void => setLimit(document.documentElement.clientWidth > 768 ? 21 : 10);
    getWidth();

    window.addEventListener('resize', getWidth);

    return () => window.removeEventListener('resize', getWidth);
  }, []);

  const gridContainer = useRef<HTMLDivElement>(null);

  const params = useQueryParams();

  useEffect(() => {
    if (gridContainer.current && params.offset === 0) {
      gridContainer.current.scrollTo(0, 0);
    }
  }, [params.offset]);

  const { data, loading, fetchMore, previousData } = useGetPokemons({
    limit: limit,
    ...params,
  });

  const [isRefetch, setRefetch] = useState(false);

  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const { clientHeight, scrollHeight, scrollTop } = e.target as HTMLDivElement;
      const minHeight = scrollHeight - (scrollTop + clientHeight);
      const threshold = clientHeight / 4;
      const isSameData =
        JSON.stringify(data?.pokemon_v2_pokemon) ===
        JSON.stringify(previousData?.pokemon_v2_pokemon);

      if (minHeight < threshold && !isRefetch && !isSameData) {
        setRefetch(true);
        let nextOffset = 0;

        if (data?.pokemon_v2_pokemon) {
          nextOffset =
            data?.pokemon_v2_pokemon.length > params.offset + limit
              ? data?.pokemon_v2_pokemon.length
              : params.offset + limit;
        }

        fetchMore({ variables: { offset: nextOffset } }).finally(() => setRefetch(false));
        setQueryParams({ ...params, offset: nextOffset });
        return;
      }
    },
    [
      data?.pokemon_v2_pokemon,
      fetchMore,
      isRefetch,
      limit,
      params,
      previousData?.pokemon_v2_pokemon,
    ],
  );

  const debounceHandleScroll = useDebounce<UIEvent<HTMLDivElement>>(handleScroll, 300);

  return (
    <Container>
      <SearchFilter />
      {!loading && data?.pokemon_v2_pokemon.length === 0 ? (
        <Notification>Incorrect filters</Notification>
      ) : (
        <GridContainer onScroll={debounceHandleScroll} ref={gridContainer}>
          {dataValidation(data?.pokemon_v2_pokemon, limit).map((pokemon, idx) => (
            <PokemonCard key={pokemon?.id || idx} pokemon={pokemon} />
          ))}
          {(loading || isRefetch) &&
            dataValidation([], 6).map((pokemon, idx) => (
              <PokemonCard key={idx} pokemon={pokemon} />
            ))}
        </GridContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.dynamicTheme.pokedexBG};
  height: calc(100vh - 93px);
  padding: 73px 158px 0;
  overflow: hidden;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 27px 24px 0;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    min-height: calc(100vh - 64px);
    padding: 20px 20px 0;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: min-content;
  gap: 45px 34px;
  margin: 50px 0 30px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 18px;
    margin: 80px 0 50px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
    margin: 30px 0;
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
