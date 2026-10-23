import styled from 'styled-components';

import { TextProps } from '../types';

export const TitleH3 = styled.h3<TextProps>`
  color: ${({ theme }) => theme.dynamicTheme.color};
  margin: 0;
  font-weight: 400;
  text-align: center;
  letter-spacing: 3px;

  font-size: 35px;
  line-height: 41px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    font-size: 24px;
    line-height: 28px;
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
