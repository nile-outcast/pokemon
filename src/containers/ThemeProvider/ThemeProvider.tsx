import React, { createContext, FC, ReactNode, useContext, useState } from 'react';
import { useTheme } from 'src/hooks';
import { ThemeType } from 'src/theme';
import { ThemeProvider as Provider } from 'styled-components';

type ContextType = [ThemeType, React.Dispatch<React.SetStateAction<ThemeType>>];

const initialState: ContextType = ['light', () => undefined];

const ThemeTypeContext = createContext(initialState);

export const useThemeTypeContex = (): ContextType => useContext(ThemeTypeContext);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>('light');
  const theme = useTheme(themeType);

  return (
    <Provider theme={theme}>
      <ThemeTypeContext.Provider value={[themeType, setThemeType]}>
        {children}
      </ThemeTypeContext.Provider>
    </Provider>
  );
};
