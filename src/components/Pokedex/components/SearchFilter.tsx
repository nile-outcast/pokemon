import React from 'react';
import { SearchInput } from 'src/components/ui';
import styled from 'styled-components';

export const SearchFilter = (): JSX.Element => {
  return (
    <Container>
      <Title>
        800 <strong>Pokemons</strong> for you to choose your favorite
      </Title>
      <SearchInput />
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

const Title = styled.h3`
  color: ${({ theme }) => theme.dynamicTheme.color};
  margin: 0 4px;
  font-weight: 400;
  font-size: 35px;
  line-height: 41px;
  text-align: center;
  letter-spacing: 3px;
  margin-bottom: 34px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 29px;
  }
`;
