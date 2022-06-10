import React, { useCallback, useEffect, useState } from 'react';
import { Menu, PokemonLogo } from 'src/components/ui';
import styled from 'styled-components';

import { NavBar, ThemeToggle } from './components';

export const Header = (): JSX.Element => {
  const [isOpenMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = useCallback(() => setOpenMenu(true), []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent): void => {
      const startPoint = e.changedTouches[0].clientY;

      const handleTouchEnd = (e: TouchEvent): void => {
        const endPoint = e.changedTouches[0].clientY;
        if (startPoint - endPoint > 100) setOpenMenu(false);

        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchend', handleTouchEnd);
    };

    if (isOpenMenu) {
      document.addEventListener('touchstart', handleTouchStart);
      return () => document.removeEventListener('touchstart', handleTouchStart);
    }
  }, [isOpenMenu]);

  return (
    <Back>
      <BackGround data-menu={isOpenMenu}>
        <Container data-menu={isOpenMenu}>
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
        </Container>
      </BackGround>
    </Back>
  );
};

const Back = styled.div`
  position: relative;
  height: 93px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    height: 64px;
  }
`;

const BackGround = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 93px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    &[data-menu='false'] {
      height: 64px;
      background-color: ${({ theme }) => theme.colors.black}00;
      transition-property: background-color, height;
      transition-duration: 1s, 0s;
      transition-delay: 0s, 1s;
    }
    &[data-menu='true'] {
      position: fixed;
      height: 100vh;
      background-color: ${({ theme }) => theme.colors.black}50;
      transition: background-color 1s;
    }
  }
`;

const Container = styled.header`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.dynamicTheme.headerBG};
  box-shadow: 0px 4px 16px rgba(1, 28, 64, 0.2);
  overflow: hidden;
  height: 93px;
  padding: 0 83px 0 157px;

  transition-property: border-radius, height;
  transition-duration: 1s, 1s;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 0 12px 0 20px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    & > :first-child {
      flex: 0;
    }

    &[data-menu='false'] {
      justify-content: space-between;
      height: 64px;
      padding: 0 26px;
      border-radius: 0px;

      & > :first-child > svg {
        width: 58px;
        height: 22px;
        transition: all 1s;
      }
      & > :nth-child(2) {
        visibility: hidden;
        opacity: 0;
        transition: all 1s;
      }
      & > :last-child {
        visibility: visible;
        opacity: 1;
        transition: all 1s 0.3s;
      }
    }

    &[data-menu='true'] {
      height: 357px;
      flex-direction: column;
      padding: 37px 80px;
      border-radius: 0px 0px 16px 16px;

      & > :first-child > svg {
        width: 138px;
        height: 51px;
        transition: all 1s;
      }
      & > :nth-child(2) {
        min-width: 260px;
        visibility: visible;
        opacity: 1;
        transition: opacity 1s;
      }
      & > :last-child {
        visibility: hidden;
        opacity: 0;
      }
    }
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
  }
`;

const HiddenBox = styled.div`
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    flex-direction: column;

    & > :last-child {
      align-self: flex-end;
    }
  }
`;

const MenuBox = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    display: block;
  }
`;
