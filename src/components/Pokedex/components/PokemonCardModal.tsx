import React from 'react';
import { BASE_IMAGE_URL } from 'src/api';
import { useGetPokemonById } from 'src/apollo/queries/apollo-hooks';
import { Image as Img } from 'src/components/ui';
import { Close } from 'src/components/ui/icons';
import { gradients, typeColors } from 'src/theme';
import { dataValidation, getTextFormat } from 'src/utils';
import styled from 'styled-components';

import { BaseType } from './BaseType';
import { ModalRightBox } from './ModalRightBox';

type Props = {
  id: number;
  closeModal: () => void;
};
export const PokemonCardModal = ({ id, closeModal }: Props): JSX.Element => {
  const { data } = useGetPokemonById({ id });

  const pokemon = data?.pokemon_v2_pokemon_by_pk;

  return (
    <BackGround>
      <Container>
        <CloseIcon onClick={closeModal} />
        <LeftBox
          data-empty={!pokemon}
          bgcolor={pokemon?.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name || ''}
        >
          <Image src={pokemon ? `${BASE_IMAGE_URL}${pokemon?.id}.png` : ''} bgcolor="" />

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
        </LeftBox>

        <ModalRightBox pokemon={pokemon} />
      </Container>
    </BackGround>
  );
};

const BackGround = styled.div`
  z-index: 200;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.black}50;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  border-radius: 16px;
  width: 100%;
  max-width: 796px;
  margin: 0 50px 0;

  height: 378px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    height: 323px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    flex-direction: column;
    margin: 0;
    height: 100%;
  }
`;

const LeftBox = styled.div<{ bgcolor: keyof typeof gradients | '' }>`
  overflow: hidden;
  position: relative;
  height: 378px;
  width: 378px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  background: ${({ theme, bgcolor }) => (!bgcolor ? bgcolor : theme.gradients[bgcolor] ?? bgcolor)};

  @media ${({ theme }) => theme.breakpoints.tablet} {
    height: 323px;
    width: 323px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 16px;
  }
`;

const Image = styled(Img)`
  width: 100%;
  height: 100%;
  background: none;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    height: 30%;
    z-index: 100;
    position: absolute;
    top: 75px;
  }
`;

const Types = styled.div`
  display: flex;
  position: absolute;
  right: 14px;
  bottom: 16px;

  & :nth-child(n + 2) {
    margin-left: 10px;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    right: 12px;
    bottom: 14px;

    & > :nth-child(n + 2) {
      margin-left: 8px;
    }
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    display: none;
  }
`;

const Type = styled(BaseType)`
  font-size: 9px;
  line-height: 11px;
  height: 12px;
  width: 40px;
`;

const CloseIcon = styled(Close)`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: -48px;

  & rect {
    fill: ${({ theme }) => theme.dynamicTheme.iconBG};
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    top: -40px;
    width: 26px;
    height: 26px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    z-index: 300;
    top: 15px;
    left: 15px;
    right: auto;
  }
`;
