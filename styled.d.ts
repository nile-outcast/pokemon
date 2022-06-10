import 'styled-components';

import { breakpoints, colors, DynamicTheme, dynamicTheme, gradients, skeleton } from 'src/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    dynamicTheme: DynamicTheme,
    breakpoints: typeof breakpoints
    colors: typeof colors
    gradients: typeof gradients
    skeleton: typeof skeleton
  }
}
