import 'styled-components';

import { breakpoints, colors, DynamicTheme, gradients } from 'src/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    dynamicTheme: DynamicTheme;
    breakpoints: typeof breakpoints;
    colors: typeof colors;
    gradients: typeof gradients;
  }
}
