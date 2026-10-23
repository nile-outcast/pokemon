import styled from 'styled-components';

import { TextProps } from '../types';

export const TitleH5 = styled.h5<TextProps>`
  color: ${({ theme }) => theme.dynamicTheme.color};
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  height: 21px;

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
