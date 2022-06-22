import React, { ChangeEvent, FocusEvent, useCallback, useState } from 'react';
import { GetPokemonsVars } from 'src/apollo/types';
import { BaseButton, Input as BaseInput } from 'src/components/ui';
import styled from 'styled-components';

import { initialRange, setQueryParams, useQueryParams } from '../queryParams';

type Props = {
  label: keyof Pick<GetPokemonsVars, 'attack' | 'experience'>;
};

type InputProps = { name: keyof GetPokemonsVars['attack'] };

export const AttackAndExperienceFilter = ({ label }: Props): JSX.Element => {
  const params = useQueryParams();

  const [values, setValues] = useState(params[label]);
  const error = values.from > values.to;

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement & InputProps>) =>
      setValues((prev) => ({
        ...prev,
        [target.name]: target.value.replace(/^(0)(\d+)/, '$2').replace(/[^0-9]/g, ''),
      })),
    [],
  );

  const handleBlur = useCallback(
    ({ target }: FocusEvent<HTMLInputElement & InputProps>) =>
      !target.value && setValues((prev) => ({ ...prev, [target.name]: initialRange[target.name] })),
    [],
  );

  const handleApply = useCallback(
    () => setQueryParams({ ...params, offset: 0, [label]: values }),
    [label, params, values],
  );

  return (
    <Container>
      <Label data-from>From</Label>
      <Label>To</Label>

      <Input
        name="from"
        value={values.from}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={8}
        data-error={error}
      />

      <Line />

      <Input
        name="to"
        value={values.to}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={8}
        data-error={error}
      />

      <ApplyButton disabled={error} type="button" onClick={handleApply}>
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

const Label = styled.p`
  text-align: left;
  margin: 0;
  margin-left: 10px;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.dynamicTheme.color};

  &[data-from='true'] {
    grid-column: 1 / span 2;
  }
`;

const Input = styled(BaseInput)<InputProps>`
  font-size: 12px;
  line-height: 15px;
  width: 96px;
  height: 19px;
  padding: 2px 12px;
  box-shadow: 0px 1px 7px 2px ${({ theme }) => theme.dynamicTheme.color}20;

  &[data-error='true'] {
    color: ${({ theme }) => theme.colors.danger};
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

  &:disabled {
    background-color: ${({ theme }) => theme.colors.danger};
  }
`;
