import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { Input, TitleH3 } from 'src/components/ui';
import { useDebounce } from 'src/hooks';
import { typeColors } from 'src/theme';
import styled from 'styled-components';

import { setQueryParams, useQueryParams } from '../queryParams';
import { Filter } from './Filter';

export const SearchFilter = (): JSX.Element => {
  const params = useQueryParams();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setQueryParams({ ...params, offset: 0, name: e.target.value.toLowerCase() }),
    [params],
  );

  const debounceHandleChange = useDebounce<ChangeEvent<HTMLInputElement>>(handleChange, 700);

  const types = useMemo(() => Object.keys(typeColors).sort(), []);

  return (
    <Container>
      <Title>
        800 <strong>Pokemons</strong> for you to choose your favorite
      </Title>

      <Input type="search" placeholder="Encuentra tu pokémon..." onChange={debounceHandleChange} />

      <FilterBox>
        <Filter label="Type" />
        <Filter label="Experience" />
        <Filter label="Attack" />
      </FilterBox>
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

const FilterBox = styled.div`
  display: flex;
  margin-top: 36px;
  margin-left: 30px;

  & > :nth-child(n + 2) {
    margin-left: 64px;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: 12px;
    margin-left: 0;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    display: none;
  }
`;
