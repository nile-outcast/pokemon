import React, { ChangeEvent, useCallback, useState } from 'react';
import { BaseInput, TitleH3 } from 'src/components/ui';
import { useDebounce } from 'src/hooks';
import styled from 'styled-components';

import { setQueryParams, useQueryParams } from '../../queryParams';
import { Filter } from './Filter';

export const Filters = (): JSX.Element => {
  const params = useQueryParams();

  const [text, setText] = useState(params.name);

  const setParams = useCallback(
    (name: string) => setQueryParams({ ...params, offset: 0, name }),
    [params],
  );

  const debounceSetParams = useDebounce(setParams, 700);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      debounceSetParams(e.target.value);
    },
    [debounceSetParams],
  );

  return (
    <Container>
      <Title>
        800 <strong>Pokemons</strong> for you to choose your favorite
      </Title>

      <SearchInput
        value={text}
        onChange={handleChange}
        type="search"
        placeholder="Encuentra tu pokémon..."
      />

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

const SearchInput = styled(BaseInput)`
  box-shadow: 4px 4px 16px rgba(1, 28, 64, 0.2);
  padding: 0 30px;
  height: 53px;
  font-size: 16px;
  line-height: 20px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    box-shadow: 2px 2px 2px rgba(33, 33, 33, 0.1);
    height: 36px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    box-shadow: 4px 4px 4px rgba(33, 33, 33, 0.1);
    height: 31px;
    font-size: 12px;
    line-height: 15px;
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
