import React, { ReactNode, useCallback, useState } from 'react';
import { ArrowFilter } from 'src/components/ui/icons';
import styled from 'styled-components';

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
        <Text>{label}</Text>
      </div>

      {isOpen && <ChildrenBox>{children}</ChildrenBox>}
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
    top: 11px;
    right: 7px;
  }
`;

const Arrow = styled(ArrowFilter)`
  transition: transform 0.5s;

  &[data-open='true'] {
    transform: rotate(180deg);
  }
`;

const Text = styled.span`
  font-family: Source Sans Pro;
  font-size: 16px;
  line-height: 21px;
  color: ${({ theme }) => theme.dynamicTheme.color};
`;

const ChildrenBox = styled.div`
  min-width: 100%;
  z-index: 200;
  position: absolute;
  top: 29px;
  left: 0;
  box-shadow: 4px 4px 8px rgba(1, 28, 64, 0.2);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.dynamicTheme.searchBG};
`;
