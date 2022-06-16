import styled from 'styled-components';

export const TitleH1 = styled.h1`
  color: ${({ theme }) => theme.dynamicTheme.color};
  margin: 0;
  font-weight: 400;
  letter-spacing: 4px;

  font-size: 72px;
  line-height: 84px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    font-size: 42px;
    line-height: 49px;
  }
`;
