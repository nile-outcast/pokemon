import React, { useCallback, useMemo, useState } from 'react';
import { useDebounce } from 'src/hooks';
import { typeColors } from 'src/theme';
import { getTextFormat } from 'src/utils';
import styled from 'styled-components';

import { setQueryParams, useQueryParams } from '../queryParams';
import { FilterText } from './FilterText';

export const TypeFilter = (): JSX.Element => {
  const params = useQueryParams();

  const [checkedTypes, setTypes] = useState(params.types);

  const types = useMemo(() => Object.keys(typeColors).sort(), []);

  const setParams = useCallback(
    (types: string[]) => setQueryParams({ ...params, offset: 0, types }),
    [params],
  );

  const debounceSetParams = useDebounce<string[]>(setParams, 700);

  const handleClickType = useCallback(
    (type: string) =>
      setTypes((prev) => {
        const typesSet = new Set(prev);

        if (typesSet.has(type)) typesSet.delete(type);
        else typesSet.add(type);

        debounceSetParams([...typesSet]);

        return [...typesSet];
      }),
    [debounceSetParams],
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

  & > :nth-child(n + 2) {
    margin-top: 8px;
  }

  ::-webkit-scrollbar {
    width: 1px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.dynamicTheme.color}80;
    border-radius: 1px;
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
