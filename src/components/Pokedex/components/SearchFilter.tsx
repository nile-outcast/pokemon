import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { SearchInput, TitleH3 } from 'src/components/ui';
import { useDebounce } from 'src/hooks';
import { typeColors } from 'src/theme';
import { getTextFormat } from 'src/utils';
import styled from 'styled-components';

import { setQueryParams, useQueryParams } from '../queryParams';
import { Filter } from './Filter';
import { FilterText } from './FilterText';

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
      <SearchInput placeholder="Encuentra tu pokémon..." onChange={debounceHandleChange} />
      <FilterBox>
        <Filter label="Type">
          <TypesBox>
            {types.map((type) => (
              <div key={type}>
                <FilterText>{getTextFormat(type)}</FilterText>
              </div>
            ))}
          </TypesBox>
        </Filter>
      </FilterBox>
    </Container>
  );
};

const TypesBox = styled.div`
  height: 106px;
  text-align: left;
  overflow-y: scroll;
  margin: 12px;
  margin-left: 32px;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  & > :nth-child(n + 2) {
    margin-top: 8px;
  }
`;

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

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: 12px;
    margin-left: 0;
  }
`;
