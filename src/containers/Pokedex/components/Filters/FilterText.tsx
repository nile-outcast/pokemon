import styled from 'styled-components';

export const FilterText = styled.span`
  font-family: Source Sans Pro;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.dynamicTheme.color};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
