import React, { useCallback, useEffect, useState } from 'react';
import { Menu, PokemonLogo } from 'src/components/ui';
import styled from 'styled-components';

import { MobileMenu, NavBar, ThemeToggle } from './components';

export const Header = (): JSX.Element => {
  const [isOpenMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = useCallback(() => setOpenMenu(true), []);
  const handleCloseMenu = useCallback(() => setOpenMenu(false), []);

  return (
    <Container>
      <LogoBox>
        <PokemonLogo />
      </LogoBox>

      <HiddenBox>
        <NavBar />
        <ThemeToggle />
      </HiddenBox>

      <MenuBox>
        <Menu onClick={handleOpenMenu} />
      </MenuBox>

      {isOpenMenu && <MobileMenu closeMenu={handleCloseMenu} />}
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.dynamicTheme.headerBG};
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

  & > svg {
    width: 157px;
    height: 63px;

    @media ${({ theme }) => theme.breakpoints.tablet} {
      width: 121px;
      height: 45px;
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
      width: 58px;
      height: 22px;
    }
  }
`;

const HiddenBox = styled.div`
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    display: none;
  }
`;

const MenuBox = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    display: flex;
    align-items: center;
  }
`;
