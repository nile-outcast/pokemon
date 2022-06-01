import React, { useCallback, useEffect } from 'react';
import { PokemonLogo } from 'src/components/ui';
import styled from 'styled-components';

import { NavBar, ThemeToggle } from '.';

type Props = {
  closeMenu: () => void;
};

export const MobileMenu = ({ closeMenu }: Props): JSX.Element => {
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const startPoint = e.changedTouches[0].clientY;

      const handleTouchEnd = (e: TouchEvent): void => {
        const endPoint = e.changedTouches[0].clientY;
        if (startPoint - endPoint > 100) closeMenu();

        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchend', handleTouchEnd);
    },
    [closeMenu],
  );

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, [handleTouchStart]);

  return (
    <Container>
      <MenuBox>
        <LogoBox>
          <PokemonLogo />
        </LogoBox>

        <NavBar />

        <ThemeToggle />
      </MenuBox>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black}50;
`;

const MenuBox = styled.div`
  background-color: ${({ theme }) => theme.dynamicTheme.headerBG};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 37px 80px;
  border-radius: 0px 0px 16px 16px;

  & > :last-child {
    align-self: flex-end;
  }
`;

const LogoBox = styled.div`
  flex: 1;

  & > svg {
    width: 138px;
    height: 51px;
  }
`;
