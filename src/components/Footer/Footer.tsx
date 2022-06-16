import React from 'react';
import styled from 'styled-components';

export const Footer = (): JSX.Element => (
  <Container>
    <Text data-small>Make with ❤️</Text>
    <Text>github</Text>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
  padding-left: 127px;
  padding-right: 220px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding-left: 37px;
    padding-right: 68px;
    margin-bottom: 20px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    margin-bottom: 16px;
    padding: 0;
    flex-direction: column-reverse;
    width: max-content;
    align-self: center;

    & > :last-child {
      margin-bottom: 5px;
    }
  }
`;

const Text = styled.p`
  color: ${({ theme }) => theme.dynamicTheme.color};
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;

  &[data-small='true'] {
    @media ${({ theme }) => theme.breakpoints.tablet} {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
    }
  }
`;
