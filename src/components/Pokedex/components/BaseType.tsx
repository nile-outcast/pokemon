import styled from 'styled-components';

export const BaseType = styled.div<{ bgcolor: string }>`
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.dynamicTheme.color};
  background-color: ${({ bgcolor }) => bgcolor};
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.18);
  border-radius: 11px;

  &[data-empty='true'] {
    ${({ theme }) => theme.skeleton}
  }
`;
