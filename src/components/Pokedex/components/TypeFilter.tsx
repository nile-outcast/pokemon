import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'src/hooks';
import { typeColors } from 'src/theme';
import { getTextFormat } from 'src/utils';
import styled from 'styled-components';

import { setQueryParams, useQueryParams } from '../queryParams';
import { FilterText } from './FilterText';

export const TypeFilter = (): JSX.Element => {
  const params = useQueryParams();

  const [checkedTypes, setTypes] = useState(params.types);
  const refTypes = useRef<string[]>([]);

  const types = useMemo(() => Object.keys(typeColors).sort(), []);

  const handleSetParams = useCallback(
    () => setQueryParams({ ...params, offset: 0, types: refTypes.current }),
    [params],
  );

  const debounceSetParams = useDebounce<undefined>(handleSetParams, 700);

  const handleClickType = useCallback(
    (type: string) => {
      const idx = checkedTypes.indexOf(type);

      if (idx === -1)
        setTypes((prev) => {
          const types = [...prev, type];
          refTypes.current = types;
          return types;
        });
      else
        setTypes((prev) => {
          const types = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
          refTypes.current = types;
          return types;
        });

      debounceSetParams(undefined);
    },
    [checkedTypes, debounceSetParams],
  );

  return (
    <TypesBox>
      {types.map((type) => (
        <Type key={type} onClick={() => handleClickType(type)}>
          <CheckBox checked={checkedTypes.includes(type)} />
          <FilterText>{getTextFormat(type)}</FilterText>
        </Type>
      ))}
    </TypesBox>
  );
};

const TypesBox = styled.div`
  height: 106px;
  text-align: left;
  overflow-y: scroll;
  margin: 12px;
  margin-left: 32px;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  & > :nth-child(n + 2) {
    margin-top: 8px;
  }
`;

const Type = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: max-content;
`;

const CheckBox = styled.div<{ checked: boolean }>`
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border: 1px solid ${({ theme }) => theme.dynamicTheme.color};
  background-color: ${({ theme, checked }) => checked && theme.colors.danger};
`;
