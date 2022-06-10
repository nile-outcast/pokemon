import styled from 'styled-components';

export const TitleH3 = styled.h3`
  color: ${({ theme }) => theme.dynamicTheme.color};
  margin: 0 4px;
  font-weight: 400;
  font-size: 35px;
  line-height: 41px;
  text-align: center;
  letter-spacing: 3px;
  margin-bottom: 34px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 29px;
  }
`;
