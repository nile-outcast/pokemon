import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  return <Input {...props} />;
};

const Input = styled.input`
  background-color: ${({ theme }) => theme.dynamicTheme.searchBG};
  color: ${({ theme }) => theme.dynamicTheme.color};
  box-shadow: 4px 4px 16px rgba(1, 28, 64, 0.2);
  border: none;
  outline: none;
  border-radius: 40px;
  padding: 0 30px;
  width: 100%;
  height: 53px;
  font-family: 'Source Sans Pro';
  font-size: 16px;
  line-height: 20px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    box-shadow: 2px 2px 2px rgba(33, 33, 33, 0.1);
    height: 36px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    box-shadow: 4px 4px 4px rgba(33, 33, 33, 0.1);
    height: 31px;
    font-size: 12px;
    line-height: 15px;
  }
`;
