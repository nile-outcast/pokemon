import { css } from 'styled-components';

export { breakpoints } from './breakpoints';
export { colors, typeColors } from './colors';
export type { DynamicTheme } from './dynamicTheme';
export { dynamicTheme } from './dynamicTheme';
export { gradients } from './gradients';

export const skeleton = css`
  background: linear-gradient(to right, #bababa 0%, #f6f7f9 40%, #bababa 100%);
  background-size: 400% 400%;
  animation: pulse 1s linear infinite;
  @keyframes pulse {
    0% {
      background-position: 0%;
    }
     100% {
        background-position: -100%;
      }
    }
`;
