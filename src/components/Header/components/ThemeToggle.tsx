import React, { useCallback } from 'react';
import { Moon, Sun } from 'src/components/ui';
import { useThemeTypeContex } from 'src/containers/ThemeProvider';
import styled from 'styled-components';

export const ThemeToggle = (): JSX.Element => {
  const [themeType, setThemeType] = useThemeTypeContex();

  const changeTheme = useCallback(
    (): void => setThemeType((prev) => (prev === 'light' ? 'dark' : 'light')),
    [setThemeType],
  );

  return (
    <Toggle data-status={themeType} onClick={changeTheme}>
      <IconBox>{themeType === 'light' ? <Sun /> : <Moon />}</IconBox>
    </Toggle>
  );
};

const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 44px;
  width: 80px;
  padding: 0 2px;
  border-radius: 22px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.24), inset 0px 1px 1px rgba(0, 0, 0, 0.14);

  &[data-status='dark'] {
    justify-content: flex-start;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: white;
`;
