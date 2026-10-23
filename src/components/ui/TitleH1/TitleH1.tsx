import styled from 'styled-components';

import { TextProps } from '../types';

export const TitleH1 = styled.h1<TextProps>`
  color: ${({ theme }) => theme.dynamicTheme.color};
  margin: 0;
  font-weight: 400;
  letter-spacing: 4px;

  font-size: 72px;
  line-height: 84px;
  height: 84px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    font-size: 42px;
    line-height: 49px;
    height: 49px;
  }

  &[data-empty='true'] {
    border-radius: 999px;
  }

  ${({ ellipsis }) =>
    ellipsis &&
    `
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}

  ${({ capitalize }) =>
    capitalize &&
    `
    text-transform: capitalize;
  `}
`;
