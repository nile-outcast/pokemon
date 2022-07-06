import React from 'react';
import { ColorNameType } from 'src/theme';
import { Stats } from 'src/types';
import styled from 'styled-components';

type Props = {
  title: typeof Stats[keyof typeof Stats];
  isEmptyData: boolean;
  baseStat: number | undefined;
  chargeColor?: ColorNameType;
};

export const Experience = ({
  title,
  isEmptyData,
  baseStat,
  chargeColor = 'yellow',
}: Props): JSX.Element => {
  return (
    <>
      <ExperienceText>{title}</ExperienceText>
      <ExperienceText data-empty={isEmptyData}>
        <strong>{!isEmptyData && `${baseStat},00`}</strong>
      </ExperienceText>
      <ChargeBox data-empty={isEmptyData}>
        {!isEmptyData && baseStat && <Charge width={baseStat / 10} bgcolor={chargeColor} />}
      </ChargeBox>
    </>
  );
};

const ExperienceText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};

  font-size: 16px;
  line-height: 20px;
  height: 20px;
  border-radius: 10px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: 14px;
    line-height: 16px;
    height: 16px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
  }

  &[data-empty='true'] {
    width: 40%;
  }
`;

const ChargeBox = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;

  height: 5px;
  margin-top: 3px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    width: 85%;
    height: 8px;
    margin-top: 12px;
  }
`;

const Charge = styled.div<{ width: number; bgcolor: ColorNameType }>`
  width: ${({ width }) => width}%;
  background: ${({ theme, bgcolor }) => theme.gradients.vertical[bgcolor]};
  height: 100%;
  border-radius: 8px;
`;
