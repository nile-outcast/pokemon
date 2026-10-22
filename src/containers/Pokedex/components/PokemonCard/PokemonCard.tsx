import { CorePokemon, StatLabel } from 'src/apollo/types';
import { Image as Img, TitleH5 } from 'src/components/ui';
import { ColorType } from 'src/theme';
import { dataValidation, getTextFormat } from 'src/utils';
import styled from 'styled-components';

import { BaseType } from '../BaseType';
import { Stat } from '../Stat';

type Props = {
  pokemon?: CorePokemon;
  onClick?: (pokemonId: number) => void;
};

export const PokemonCard = ({ pokemon, onClick }: Props): JSX.Element => {
  const handleClick = (): void => {
    if (pokemon && onClick) {
      onClick(pokemon.id);
    }
  };

  return (
    <Container onClick={handleClick}>
      <Info>
        <div>
          <Name data-empty={!pokemon}>{getTextFormat(pokemon?.name, true)}</Name>
        </div>

        <StatsBox>
          {dataValidation(pokemon?.pokemonstats, 3)
            .slice(1, 3)
            .map((stat, idx) => (
              <Stat
                key={stat?.stat.name ?? idx}
                isEmptyData={!pokemon}
                label={stat && StatLabel[stat.stat.name]}
                stat={stat?.base_stat}
              />
            ))}
        </StatsBox>

        <Types>
          {dataValidation(pokemon?.pokemontypes, 2).map((type, idx) => (
            <Type
              data-empty={!pokemon}
              key={type?.type.name ?? idx}
              bgcolor={type?.type.name && ColorType[type?.type.name]}>
              {getTextFormat(type?.type.name)}
            </Type>
          ))}
        </Types>
      </Info>

      <ImageBox data-empty={!pokemon}>
        <Image
          src={pokemon?.pokemonsprites.at(0)?.sprites}
          bgcolor={pokemon?.pokemonspecy.pokemoncolor.name}
          data-empty={!pokemon}
        />
      </ImageBox>
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

const ImageBox = styled.div`
  position: absolute;
  top: 0;
  right: -5%;
  width: 70%;
  height: 100%;
`;

const Image = styled(Img)`
  width: 100%;
  height: 100%;

  &[data-empty='true'] {
    display: none;
  }
`;

const Name = styled(TitleH5)`
  font-weight: 700;
  overflow-wrap: anywhere;
  width: 30%;
`;

const Info = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 5px 0 12px 25px;
  width: 100%;
`;

const StatsBox = styled.div`
  margin-top: 20px;

  & > :first-child {
    margin-right: 8px;
  }
`;

const Types = styled.div`
  margin-top: 10px;
  display: flex;
`;

const Type = styled(BaseType)`
  font-size: 12px;
  line-height: 14px;
  height: 16px;
  width: 60px;
  margin-right: 12px;
`;
