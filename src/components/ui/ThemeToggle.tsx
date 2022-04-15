import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Moon, Sun } from './icons';

export const ThemeToggle = (): JSX.Element => {
  const [status, setStatus] = useState<'ligth' | 'dark'>('ligth');

  const changeStatus = useCallback(
    (): void => setStatus((prev) => (prev === 'ligth' ? 'dark' : 'ligth')),
    [],
  );

  return (
    <Toggle data-status={status} onClick={changeStatus}>
      <IconBox>{status === 'ligth' ? <Sun /> : <Moon />}</IconBox>
    </Toggle>
  );
};

const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 44px;
  width: 80px;
  padding: 0 2px;
  border-radius: 22px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.24), inset 0px 1px 1px rgba(0, 0, 0, 0.14);

  &[data-status='dark'] {
    justify-content: flex-end;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: white;
`;
