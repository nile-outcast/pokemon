import { useCallback, useRef, useState } from 'react';
import { ArrowFilter } from 'src/components/ui/icons';
import { useOnClickOutside } from 'src/hooks';
import styled from 'styled-components';

import { FilterText } from './FilterText';
import { RangeFilter } from './RangeFilter';
import { TypeFilter } from './TypeFilter';

const FilterChildren = {
  Type: <TypeFilter />,
  Attack: <RangeFilter label="attack" />,
  Experience: <RangeFilter label="experience" />,
};

type Props = {
  label: keyof typeof FilterChildren;
};

export const Filter = ({ label }: Props): JSX.Element => {
  const ref = useRef(null);

  const [isOpen, setOpen] = useState(false);

  const handleClick = useCallback(() => setOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setOpen(false), []);

  useOnClickOutside(ref, handleClose);

  return (
    <Container ref={ref}>
      <div onClick={handleClick}>
        <Arrow data-open={isOpen} />
        <FilterText>{label}</FilterText>
      </div>

      <ChildrenBox data-open={isOpen} height={label === 'Type' ? 130 : 105}>
        {FilterChildren[label]}
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

  & > :first-child {
    cursor: pointer;
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
