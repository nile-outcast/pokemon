import React, { ReactNode, useCallback, useState } from 'react';
import { ArrowFilter } from 'src/components/ui/icons';
import styled from 'styled-components';

import { FilterText } from './FilterText';

type Props = {
  label: string;
  children: ReactNode;
};

export const Filter = ({ label, children }: Props): JSX.Element => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <Container>
      <div onClick={handleClick}>
        <Arrow data-open={isOpen} />
        <FilterText>{label}</FilterText>
      </div>

      <ChildrenBox data-open={isOpen} height={label === 'Type' ? 130 : 105}>
        {children}
      </ChildrenBox>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  position: relative;
  width: 135px;
  height: 21px;
  box-shadow: 2px 2px 2px rgba(33, 33, 33, 0.1);
  border-radius: 4px;

  background-color: ${({ theme }) => theme.dynamicTheme.searchBG};

  & svg {
    position: absolute;
    top: 10px;
    right: 7px;
  }
`;

const Arrow = styled(ArrowFilter)`
  transition: transform 0.5s;

  &[data-open='true'] {
    transform: rotate(180deg);
  }
`;

const ChildrenBox = styled.div<{ height: number }>`
  height: 0;
  overflow: hidden;
  min-width: 100%;
  z-index: 200;
  position: absolute;
  top: 29px;
  left: 0;
  box-shadow: 4px 4px 8px rgba(1, 28, 64, 0.2);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.dynamicTheme.searchBG};

  &[data-open='true'] {
    height: ${({ height }) => height}px;
  }

  transition: height 0.3s ease-in;
`;
