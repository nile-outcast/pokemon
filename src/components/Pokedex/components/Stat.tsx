import React from 'react';
import styled from 'styled-components';

type Props = {
  label: string | undefined;
  stat: number | undefined;
  isEmptyData: boolean;
  abbreviateLabel?: boolean;
};

const shortenText = (text: string): string => {
  const words = text.split(' ');
  if (words.length > 1) words[0] = words[0].slice(0, 2);
  return words.join(' ');
};

export const Stat = ({ label, stat, isEmptyData, abbreviateLabel }: Props): JSX.Element => (
  <StatBox>
    <StatText data-empty={isEmptyData}>{stat}</StatText>
    <StatName data-empty={isEmptyData}>
      {abbreviateLabel ? shortenText(label || '') : label}
    </StatName>
  </StatBox>
);

const StatBox = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

const StatName = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.dynamicTheme.statNameColor};
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  &[data-empty='true'] {
    ${({ theme }) => theme.skeleton}
    width: 100%;
    height: 14px;
    border-radius: 7px;
  }
`;

const StatText = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.dynamicTheme.color};
  font-weight: 400;
  font-size: 15px;
  line-height: 30px;

  width: 36px;
  height: 36px;
  border: 3px solid ${({ theme }) => theme.dynamicTheme.color};
  border-radius: 50%;
  margin-bottom: 7px;

  &[data-empty='true'] {
    ${({ theme }) => theme.skeleton}
    border: none;
  }
`;
