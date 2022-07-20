import styled from 'styled-components';

export const TitleH5 = styled.h5`
  color: ${({ theme }) => theme.dynamicTheme.color};
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  height: 21px;

  &[data-empty='true'] {
    border-radius: 999px;
  }
`;
