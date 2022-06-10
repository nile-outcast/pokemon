/* eslint-disable no-console */
import React, { MouseEventHandler, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useGetPokemons } from 'src/apollo/queries/apollo-hooks';
import { dataValidation } from 'src/utils';
import styled from 'styled-components';

import { Loader } from '../ui';
import { Pokemon, SearchFilter } from './components';
import { setQueryParams, useQueryParams } from './queryParams';

export const Pokedex = (): React.ReactElement => {
  const [limit, setLimit] = useState(document.documentElement.clientWidth > 768 ? 21 : 10);

  useLayoutEffect(() => {
    const getWidth = (): void => setLimit(document.documentElement.clientWidth > 768 ? 21 : 10);
    getWidth();

    window.addEventListener('resize', getWidth);

    return () => window.removeEventListener('resize', getWidth);
  }, []);

  const params = useQueryParams();

  const { data, loading, fetchMore, previousData } = useGetPokemons({
    limit: limit,
    ...params,
  });

  const [isRefetch, setRefetch] = useState(false);

  console.log(
    params,
    isRefetch,
    loading,
    data?.pokemon_v2_pokemon.length,
    previousData?.pokemon_v2_pokemon.length,
  );

  const handleScrollNext = useCallback(
    (event: React.UIEvent<HTMLElement>) => {
      event.stopPropagation();
      const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;
      const minHeight = scrollHeight - (scrollTop + clientHeight);
      const threshold = clientHeight / 4;
      const isSameLength =
        data?.pokemon_v2_pokemon.length === previousData?.pokemon_v2_pokemon.length;

      if (minHeight > threshold && isRefetch) {
        setRefetch(false);
        return;
      }

      if (minHeight < threshold && !isRefetch && !isSameLength) {
        setRefetch(true);
        const nextOffset = params.offset + limit;
        fetchMore({ variables: { offset: nextOffset } });
        setQueryParams({ ...params, offset: nextOffset });
        return;
      }

      if (isRefetch && isSameLength) {
        setRefetch(false);
        return;
      }
    },
    [
      data?.pokemon_v2_pokemon.length,
      fetchMore,
      isRefetch,
      limit,
      params,
      previousData?.pokemon_v2_pokemon.length,
    ],
  );

  return (
    <Container>
      <SearchFilter />

      <GridContainer onScroll={handleScrollNext}>
        {dataValidation(data?.pokemon_v2_pokemon, limit).map((pokemon, idx) => (
          <Pokemon key={pokemon?.id || idx} pokemon={pokemon} />
        ))}
      </GridContainer>

      <LoderBox>{(loading || isRefetch) && <Loader />}</LoderBox>
    </Container>
  );
};

const Container = styled.div`
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
  height: 70%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 18px;
    margin: 80px 0 50px;
    height: 486px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
    margin: 30px 0;
  }
`;

const LoderBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 8px;

  & > svg {
    height: 8px;
    width: 56px;
  }
`;
