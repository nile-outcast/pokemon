import React, { useState } from 'react';
import styled from 'styled-components';

import { Input } from './components/Input';

export const TestPage = (): JSX.Element => {
  const [todo, setTodo] = useState<string>('');

  const [list, setList] = useState<string[]>(['<div />']);

  const tag = '<div />';

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const value = target.value;
    setTodo(value);
  };

  const onClick = (): void => {
    if (todo) setList((prev) => [...prev, todo]);
  };

  return (
    <>
      <Flex>
        <Input onChange={onChange} />
        <button onClick={onClick}>Add</button>
        {list.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
        <div>{tag}</div>
      </Flex>
    </>
  );
};

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  & :nth-child(1) {
    width: 300px;
    margin-bottom: 10px;
  }
`;
