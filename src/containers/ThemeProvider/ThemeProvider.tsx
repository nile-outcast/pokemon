import React, { createContext, FC, ReactNode, useContext, useState } from 'react';
import { useTheme } from 'src/hooks';
import { ThemeType } from 'src/types';
import { ThemeProvider as Provider } from 'styled-components';

type ContextType = [ThemeType, React.Dispatch<React.SetStateAction<ThemeType>>];

const initialState: ContextType = ['light', () => undefined];

const ThemeTypeContex = createContext(initialState);

export const useThemeTypeContex = (): ContextType => useContext(ThemeTypeContex);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>('light');
  const theme = useTheme(themeType);

  return (
    <Provider theme={theme}>
      <ThemeTypeContex.Provider value={[themeType, setThemeType]}>
        {children}
      </ThemeTypeContex.Provider>
    </Provider>
  );
};
