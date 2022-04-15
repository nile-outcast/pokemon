import 'styled-components';

import { breakpoints, colors } from 'src/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: typeof breakpoints
    colors: typeof colors
  }
}
