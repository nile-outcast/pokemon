import { useMemo } from 'react';
import { breakpoints, colors, dynamicTheme, gradients } from 'src/theme';
import { ThemeType } from 'src/types';
import { DefaultTheme } from 'styled-components';

export const useTheme = (themeType: ThemeType): DefaultTheme =>
  useMemo(
    () => ({
      dynamicTheme: dynamicTheme[themeType],
      breakpoints: breakpoints,
      colors: colors,
      gradients: gradients,
    }),
    [themeType],
  );
