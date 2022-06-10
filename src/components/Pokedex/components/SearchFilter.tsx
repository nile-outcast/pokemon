import React, { ChangeEvent, useCallback } from 'react';
import { SearchInput, TitleH3 } from 'src/components/ui';
import { useDebounce } from 'src/hooks/useDebounce';
import styled from 'styled-components';

import { setQueryParams, useQueryParams } from '../queryParams';

export const SearchFilter = (): JSX.Element => {
  const params = useQueryParams();

  const setParams = (name: string): typeof params => setQueryParams({ ...params, offset: 0, name });

  const deb = useDebounce(setParams, 500);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line no-console
      console.log(e.target.value);
      deb(e.target.value);
    },
    [deb],
  );

  return (
    <Container>
      <TitleH3>
        800 <strong>Pokemons</strong> for you to choose your favorite
      </TitleH3>
      <SearchInput placeholder="Encuentra tu pokémon..." onChange={handleChange} />
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 0 12px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    padding: 0 8px;
  }
`;
