import React, { ChangeEvent, useCallback, useState } from 'react';
import { GetPokemonsVars } from 'src/apollo/types';
import { BaseButton, Input as BaseInput } from 'src/components/ui';
import styled from 'styled-components';

import { setQueryParams, useQueryParams } from '../queryParams';

type Props = {
  label: keyof Pick<GetPokemonsVars, 'attack' | 'experience'>;
};

export const AttackAndExperienceFilter = ({ label }: Props): JSX.Element => {
  const params = useQueryParams();

  const [values, setValues] = useState(params[label]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      }),
    [],
  );

  const handleApply = useCallback(
    () => setQueryParams({ ...params, [label]: values }),
    [label, params, values],
  );

  return (
    <Container>
      <Label data-first>From</Label>
      <Label>To</Label>

      <Input name="from" value={values.from} onChange={handleChange} maxLength={8} />
      <Line />
      <Input name="to" value={values.to} onChange={handleChange} maxLength={8} />

      <ApplyButton type="button" onClick={handleApply}>
        Apply
      </ApplyButton>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 96px 16px 96px;
  grid-template-rows: min-content;
  gap: 5px 20px;
  width: 285px;
  padding: 12px 24px 15px 12px;
`;

const Input = styled(BaseInput)`
  font-size: 12px;
  line-height: 15px;
  width: 96px;
  height: 19px;
  padding: 2px 12px;
  box-shadow: 1px 1px 2px 1px ${({ theme }) => theme.dynamicTheme.color}20;
`;

const Label = styled.p`
  text-align: left;
  margin: 0;
  margin-left: 10px;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.dynamicTheme.color};

  &[data-first='true'] {
    grid-column: 1 / span 2;
  }
`;

const Line = styled.div`
  align-self: center;
  width: 16px;
  height: 4px;
  border: 2px solid ${({ theme }) => theme.dynamicTheme.color};
  border-radius: 2px;
`;

const ApplyButton = styled(BaseButton)`
  margin-top: 15px;
  height: 19px;
  width: 66px;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  box-shadow: none;
  grid-column: 1 / span 3;
  justify-self: flex-end;
`;
