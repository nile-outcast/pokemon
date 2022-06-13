import React, { ChangeEvent, useCallback } from 'react';
import { SearchInput, TitleH3 } from 'src/components/ui';
import { useDebounce } from 'src/hooks';
import styled from 'styled-components';

import { setQueryParams, useQueryParams } from '../queryParams';

export const SearchFilter = (): JSX.Element => {
  const params = useQueryParams();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setQueryParams({ ...params, offset: 0, name: e.target.value }),
    [params],
  );

  const debounceHandleChange = useDebounce<ChangeEvent<HTMLInputElement>>(handleChange, 700);

  return (
    <Container>
      <Title>
        800 <strong>Pokemons</strong> for you to choose your favorite
      </Title>
      <SearchInput placeholder="Encuentra tu pokémon..." onChange={debounceHandleChange} />
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

const Title = styled(TitleH3)`
  margin: 0 4px;
  margin-bottom: 34px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    margin-bottom: 29px;
  }
`;
