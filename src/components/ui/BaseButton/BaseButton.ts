import styled from 'styled-components';

export const BaseButton = styled.button<{warn?: boolean}>`
  box-shadow: inset 0px -9px 0px rgba(0, 0, 0, 0.18);
  background-color: ${({warn}) => warn ? '#F2CB07' : '#73D677'};
  border-radius: 11px;
  width: 230px;
  height: 66px;
  font-weight: 700;
  font-size: 23px;
  line-height: 27px;
  border: none;
  cursor: pointer;
`;
