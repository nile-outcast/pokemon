import React from 'react';
import { typeColors } from 'src/theme';
import { FullPokemon, Stats } from 'src/types';
import { dataValidation, getTextFormat } from 'src/utils';
import styled from 'styled-components';

import { BaseType } from './BaseType';
import { Stat } from './Stat';

type Props = {
  pokemon: FullPokemon | undefined;
};

const flatAbilities = (pokemon: Props['pokemon']): string | undefined => {
  return pokemon?.pokemon_v2_pokemonabilities
    .reduce((names: string[], ability) => {
      names.push(getTextFormat(ability.pokemon_v2_ability.name));
      return names;
    }, [])
    .join(' - ');
};

export const ModalRightBox = ({ pokemon }: Props): JSX.Element => (
  <RightBox>
    <BoxHeader>
      {/* TODO: modal for full name */}
      <Name data-empty={!pokemon}>{getTextFormat(pokemon?.name, true) || ''}</Name>

      <Generation data-empty={!pokemon}>
        {pokemon ? `Generation ${pokemon?.pokemon_v2_pokemonspecy.generation_id}` : ''}
      </Generation>

      <ID data-empty={!pokemon}>{pokemon?.id || ''}</ID>

      <Types>
        {dataValidation(pokemon?.pokemon_v2_pokemontypes, 2).map((type, idx) => (
          <Type
            data-empty={!pokemon}
            key={type?.pokemon_v2_type.name || idx}
            bgcolor={type?.pokemon_v2_type.name ? typeColors[type?.pokemon_v2_type.name] : ''}>
            {getTextFormat(type?.pokemon_v2_type.name)}
          </Type>
        ))}
      </Types>
    </BoxHeader>

    <Content>
      <AbilitiesBox>
        <AbilitiesText data-large>{'Abilities'}</AbilitiesText>
        <AbilitiesText data-empty={!pokemon}>{flatAbilities(pokemon)}</AbilitiesText>
      </AbilitiesBox>

      <ExperienceBox>
        <div>
          <ExperienceText>{Stats[1]}</ExperienceText>
          <ExperienceText data-empty={!pokemon}>
            <strong>{pokemon && `${pokemon?.pokemon_v2_pokemonstats[0].base_stat},000`}</strong>
          </ExperienceText>
          <ChargeBox data-empty={!pokemon}>
            {pokemon && <Charge width={pokemon?.pokemon_v2_pokemonstats[0].base_stat / 10} />}
          </ChargeBox>
        </div>

        <div>
          <ExperienceText>{Stats[7]}</ExperienceText>
          <ExperienceText data-empty={!pokemon}>
            <strong>{pokemon && `${pokemon?.base_experience},000`}</strong>
          </ExperienceText>
          <ChargeBox data-empty={!pokemon}>
            {pokemon && <Charge data-bgcolor="green" width={pokemon?.base_experience / 10} />}
          </ChargeBox>
        </div>
      </ExperienceBox>

      <StatsContainer>
        {dataValidation(pokemon?.pokemon_v2_pokemonstats, 6)
          .slice(1, 5)
          .map((stat, idx) => (
            <StatBox key={stat?.pokemon_v2_stat.id || idx}>
              <Stat
                staticTheme
                abbreviateLabel
                isEmptyData={!pokemon}
                label={stat && Stats[stat.pokemon_v2_stat.id]}
                stat={stat?.base_stat}
              />
            </StatBox>
          ))}
      </StatsContainer>
    </Content>
  </RightBox>
);

const RightBox = styled.div`
  flex: 1;
  overflow: hidden;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  background: ${({ theme }) => theme.gradients.redCard};
  padding: 30px 20px 25px 15px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 28px 16px 20px 12px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    width: 100%;
    border-radius: 16px;
    padding: 75px 12px 30px;
    position: absolute;
    top: 275px;
    bottom: 0;
  }
`;

const Content = styled.div`
  @media ${({ theme }) => theme.breakpoints.mobile} {
    height: calc(100% - 60px);
    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

const Types = styled.div`
  display: none;

  & :nth-child(n + 2) {
    margin-left: 16px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    display: flex;
  }
`;

const Type = styled(BaseType)`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.black};
  height: 21px;
  width: 74px;
`;

const StatsContainer = styled.div`
  display: flex;
  & > :nth-child(n) {
    flex: 1;
  }

  & > :nth-child(n + 2) {
    margin-left: 24px;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    & > :nth-child(n + 2) {
      margin-left: 20px;
    }
  }
`;

const BaseBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 4px 4px 24px rgba(1, 17, 38, 0.2);
  border-radius: 8px;
`;

const StatBox = styled(BaseBox)`
  text-align: center;

  padding: 8px 0 5px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 6px 0 2px;
  }
`;

const AbilitiesBox = styled(BaseBox)`
  max-width: max-content;
  min-width: 70%;
  padding: 12px 28px 10px;
  margin-bottom: 21px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 8px 24px 5px;
    margin-bottom: 18px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    min-width: 100%;
    padding: 18px 20px;
    margin-bottom: 15px;
  }
`;

const AbilitiesText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};

  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  height: 19px;
  border-radius: 10px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    &[data-large='true'] {
      font-size: 31px;
      line-height: 36px;
      height: 36px;
      margin-bottom: 8px;
    }
  }
`;

const ExperienceBox = styled(BaseBox)`
  display: flex;
  & > :nth-child(n) {
    flex: 1;
  }

  padding: 20px 20px 16px;
  margin-bottom: 21px;

  & > :first-child > :last-child {
    margin-right: 28px;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 16px 16px 14px;
    margin-bottom: 18px;

    & > :first-child > :last-child {
      margin-right: 24px;
    }
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    flex-direction: column;
    padding: 14px 20px 27px;
    margin-bottom: 12px;

    & > :first-child {
      margin-bottom: 20px;
    }
  }
`;

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
const Charge = styled.div<{ width?: number }>`
  width: ${({ width }) => width}%;
  background: ${({ theme }) => theme.gradients.yellow};
  height: 100%;
  border-radius: 8px;

  &[data-bgcolor='green'] {
    background: ${({ theme }) => theme.gradients.green};
  }
`;

const Name = styled.h3`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 53%;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;
  height: 42px;
  border-radius: 21px;
  cursor: pointer;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 45%;
    font-size: 24px;
    line-height: 28px;
    height: 28px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    justify-content: center;
    align-items: center;
    text-align: center;
    position: fixed;
    top: 35px;
    left: 50px;
    right: 50px;
    width: auto;
  }

  &[data-empty='true'] {
    width: 40%;
  }
`;

const Generation = styled.div`
  text-align: right;
  color: ${({ theme }) => theme.colors.white};
  font-family: Source Sans Pro;
  margin-right: 10px;
  margin-left: auto;

  font-size: 24px;
  line-height: 30px;
  height: 30px;
  border-radius: 15px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: 21px;
    line-height: 26px;
    height: 26px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    text-align: left;
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    margin-left: 8px;
  }

  &[data-empty='true'] {
    width: 35%;
  }
`;

const ID = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  background-color: #f2cb07;
  font-size: 16px;
  line-height: 45px;

  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 25px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-bottom: 12px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    margin-bottom: 15px;
    justify-content: flex-start;
    align-items: center;

    & > :nth-child(2) {
      flex: 1;
      order: 2;
    }

    & > :last-child {
      order: 3;
    }
  }
`;
