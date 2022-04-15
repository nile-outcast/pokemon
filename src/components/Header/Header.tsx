import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from 'src/components/ui';
import { PokemonLogo } from 'src/components/ui/icons';
import { routes } from 'src/routes/Routes';
import styled from 'styled-components';

export const Header = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <Container>
      <LogoBox>
        <PokemonLogo />
      </LogoBox>

      <NavBar>
        {routes.map((route, idx) => (
          <Link key={idx} to={route.path}>
            <LinkText data-active={pathname === route.path}>{route.component}</LinkText>
          </Link>
        ))}
      </NavBar>
      <ThemeToggle />
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.third};
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

const LinkText = styled.span`
  padding-bottom: 5px;

  &[data-active='true'] {
    border-bottom: 3px solid #212121;
  }
`;
