import { useCallback, useState } from 'react';
import { CorePokemon, Stats } from 'src/apollo/types';
import { Image as Img, TitleH5 } from 'src/components/ui';
import { useSpritesWriteQuery } from 'src/hooks';
import { ColorType } from 'src/theme';
import { dataValidation, getTextFormat } from 'src/utils';
import styled from 'styled-components';

import { BaseType } from '../BaseType';
import { PokemonCardModal } from '../PokemonCardModal';
import { Stat } from '../Stat';

type Props = {
  pokemon?: CorePokemon;
};

export const PokemonCard = ({ pokemon }: Props): JSX.Element => {
  const [isOpenModal, setOpenModal] = useState(false);

  const openModal = useCallback(() => setOpenModal(true), []);

  const closeModal = useCallback(() => setOpenModal(false), []);

  useSpritesWriteQuery(pokemon);

  return (
    <>
      <Container onClick={openModal}>
        <Info>
          <div>
            <Name data-empty={!pokemon}>{getTextFormat(pokemon?.name, true)}</Name>
          </div>

          <StatsBox>
            {dataValidation(pokemon?.pokemon_v2_pokemonstats, 3)
              .slice(1, 3)
              .map((stat, idx) => (
                <Stat
                  key={stat?.pokemon_v2_stat.id || idx}
                  isEmptyData={!pokemon}
                  label={stat && Stats[stat.pokemon_v2_stat.id]}
                  stat={stat?.base_stat}
                />
              ))}
          </StatsBox>

          <Types>
            {dataValidation(pokemon?.pokemon_v2_pokemontypes, 2).map((type, idx) => (
              <Type
                data-empty={!pokemon}
                key={type?.pokemon_v2_type.name || idx}
                bgcolor={type?.pokemon_v2_type.name ? ColorType[type?.pokemon_v2_type.name] : ''}>
                {getTextFormat(type?.pokemon_v2_type.name)}
              </Type>
            ))}
          </Types>
        </Info>

        <ImageBox data-empty={!pokemon}>
          <Image
            src={pokemon?.pokemon_v2_pokemonsprites.sprites}
            bgcolor={pokemon?.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name || ''}
            data-empty={!pokemon}
          />
        </ImageBox>
      </Container>

      {isOpenModal && <PokemonCardModal id={pokemon?.id || 0} closeModal={closeModal} />}
    </>
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
