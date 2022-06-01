import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from 'src/routes';
import styled from 'styled-components';

export const NavBar = (): JSX.Element => (
  <NavBox>
    {routes.map((route, idx) => (
      <LinkText key={idx} to={route.path} exact>
        {route.component}
      </LinkText>
    ))}
  </NavBox>
);

const NavBox = styled.div`
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

  @media ${({ theme }) => theme.breakpoints.mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 36px 0 4px;
    & > :nth-last-child(n + 2) {
      margin-right: 0;
    }
  }
`;

const LinkText = styled(NavLink)`
  color: ${({ theme }) => theme.dynamicTheme.color};
  font-size: 25px;
  line-height: 29px;
  margin-bottom: 16px;

  &.active {
    color: ${({ theme }) => theme.dynamicTheme.activeLinkColor};
    border-bottom: 3px solid ${({ theme }) => theme.dynamicTheme.activeLinkColor};
    margin-bottom: 13px;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: 19px;
    line-height: 22px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    font-size: 27px;
    line-height: 32px;
  }
`;
