import * as React from 'react';
import { Menu, PokemonLogo } from 'src/components/ui';
import styled from 'styled-components';

import { NavBar, ThemeToggle } from './components';

export const Header = (): JSX.Element => {
  const [isOpenMenu, setOpenMenu] = React.useState(false);

  React.useEffect(() => {
    if (!isOpenMenu) return;

    let startPoint = 0;

    const handleTouchStart = (e: TouchEvent): void => {
      startPoint = e.changedTouches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent): void => {
      if (startPoint - e.changedTouches[0].clientY > 100) setOpenMenu(false);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
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
            <Menu onClick={() => setOpenMenu(true)} />
          </MenuBox>
        </Container>
      </BackGround>
    </Back>
  );
};

const Back = styled.header`
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
  box-shadow: 0px 4px 16px rgba(1, 28, 64, 0.2);
  background-color: ${({ theme }) => theme.dynamicTheme.headerBG};

  @media ${({ theme }) => theme.breakpoints.mobile} {
    box-shadow: none;

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

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 83px 0 157px;
  margin: 0 auto;
  height: 93px;
  max-width: 1440px;
  overflow: hidden;

  transition-property: border-radius, height;
  transition-duration: 1s, 1s;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 0 12px 0 20px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    background-color: ${({ theme }) => theme.dynamicTheme.headerBG};
    box-shadow: 0px 4px 16px rgba(1, 28, 64, 0.2);

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
