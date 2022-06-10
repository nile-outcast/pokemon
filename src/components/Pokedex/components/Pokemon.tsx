import React from 'react';
import { gradients, typeColors } from 'src/theme';
import { Pokemon as PokemonType } from 'src/types';
import { dataValidation, getTextFormat } from 'src/utils';
import styled from 'styled-components';

type Props = {
  pokemon: PokemonType | undefined;
};

export const Pokemon = ({ pokemon }: Props): JSX.Element => {
  // eslint-disable-next-line no-console
  // console.log(pokemon?.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name);
  return (
    <Container>
      <Info>
        <div>
          <Name data-empty={!pokemon}>{getTextFormat(pokemon?.name)}</Name>
        </div>

        <Stats>
          <StatBox>
            <StatText data-empty={!pokemon}>
              {pokemon?.pokemon_v2_pokemonstats[1].base_stat}
            </StatText>
            <StatName>Attack</StatName>
          </StatBox>

          <StatBox>
            <StatText data-empty={!pokemon}>
              {pokemon?.pokemon_v2_pokemonstats[2].base_stat}
            </StatText>
            <StatName>Defense</StatName>
          </StatBox>
        </Stats>

        <Types>
          {dataValidation(pokemon?.pokemon_v2_pokemontypes, 2).map((type, idx) => (
            <Type
              data-empty={!pokemon}
              key={type?.pokemon_v2_type.name || idx}
              bgcolor={type?.pokemon_v2_type.name ? typeColors[type?.pokemon_v2_type.name] : ''}
            >
              {getTextFormat(type?.pokemon_v2_type.name)}
            </Type>
          ))}
        </Types>
      </Info>

      <Image
        src={`sprites/official-artwork/${pokemon?.id || '00'}.png`}
        bgcolor={pokemon?.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name || ''}
        data-empty={!pokemon}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  background-color: ${({ theme }) => theme.dynamicTheme.pokemonBG};
  border-radius: 8px;
  height: 137px;
  overflow: hidden;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    height: 146px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    height: 140px;
  }
`;

const Image = styled.img<{ bgcolor: keyof typeof gradients | '' }>`
  position: absolute;
  top: 0;
  right: -5%;
  width: 70%;
  height: 100%;
  object-fit: contain;
  background: ${({ theme, bgcolor }) => (!bgcolor ? bgcolor : theme.gradients[bgcolor] ?? bgcolor)};

  &[data-empty='true'] {
    ${({ theme }) => theme.skeleton}
  }
`;

const Name = styled.h5`
  color: ${({ theme }) => theme.dynamicTheme.color};
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  height: 21px;

  &[data-empty='true'] {
    border-radius: 10px;
    ${({ theme }) => theme.skeleton}
  }
`;

const Info = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 5px 0 12px 25px;
  min-width: 30%;
`;

const Stats = styled.div`
  margin-top: 20px;
  & > :first-child {
    margin-right: 8px;
  }
`;
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

const Types = styled.div`
  margin-top: 10px;
  display: flex;
`;

const Type = styled.div<{ bgcolor: string }>`
  text-align: center;
  color: ${({ theme }) => theme.dynamicTheme.color};
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  background-color: ${({ bgcolor }) => bgcolor};

  height: 16px;
  width: 60px;
  margin-right: 12px;
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.18);
  border-radius: 11px;

  &[data-empty='true'] {
    ${({ theme }) => theme.skeleton}
  }
`;
