import React, { useState } from 'react';
import { useGetPokemons } from 'src/apollo/queries/apollo-hooks';
import styled from 'styled-components';

import { SearchFilter } from './components/SearchFilter';

export const Pokedex = (): React.ReactElement => {
  const [cursor, setCursor] = useState(0);
  const { data, loading, fetchMore } = useGetPokemons({ offset: cursor });
  // eslint-disable-next-line no-console
  console.log(loading, data?.pokemon_v2_pokemon);

  return (
    <Container>
      <SearchFilter />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.dynamicTheme.pokedexBG};
  min-height: calc(100vh - 93px);
  padding: 73px 158px 0;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 27px 24px 0;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    min-height: calc(100vh - 64px);
    padding: 20px 20px 0;
  }
`;
