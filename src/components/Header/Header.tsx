import React from 'react';
import { NavLink } from 'react-router-dom';
import { PokemonLogo } from 'src/components/ui';
import { routes } from 'src/routes';
import styled from 'styled-components';

import { ThemeToggle } from './components/ThemeToggle';

export const Header = (): JSX.Element => (
  <Container>
    <LogoBox>
      <PokemonLogo />
    </LogoBox>

    <NavBar>
      {routes.map((route, idx) => (
        <LinkText key={idx} to={route.path} exact>
          {route.component}
        </LinkText>
      ))}
    </NavBar>

    <ThemeToggle />
  </Container>
);

const Container = styled.header`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.dynamicTheme.header};
  height: 93px;
  box-shadow: 0px 4px 16px rgba(1, 28, 64, 0.2);
  padding: 0 83px 0 157px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 0 12px 0 20px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    height: 64px;
    padding: 0 26px;
  }
`;

const LogoBox = styled.div`
  flex: 1;
`;

const NavBar = styled.div`
  margin-right: 60px;
  & > :nth-last-child(n + 2) {
    margin-right: 55px;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-right: 20px;
    & > :nth-last-child(n + 2) {
      margin-right: 42px;
    }
  }
`;

const LinkText = styled(NavLink)`
  padding-bottom: 5px;
  color: ${({ theme }) => theme.dynamicTheme.color};

  &.active {
    color: ${({ theme }) => theme.dynamicTheme.activeLinkColor};
    border-bottom: 3px solid ${({ theme }) => theme.dynamicTheme.activeLinkColor};
  }
`;
