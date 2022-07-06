import styled from 'styled-components';

export const BaseInput = styled.input`
  background-color: ${({ theme }) => theme.dynamicTheme.searchBG};
  color: ${({ theme }) => theme.dynamicTheme.color};
  width: 100%;
  border: none;
  outline: none;
  border-radius: 40px;
  font-family: 'Source Sans Pro';
`;
