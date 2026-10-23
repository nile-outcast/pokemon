import React from 'react';
import { CorePokemon } from 'src/apollo/types';
import { Image as Img, TitleH5 } from 'src/components/ui';
import styled from 'styled-components';

type Props = {
  pokemon?: CorePokemon;
  onClick?: (pokemonId: number) => void;
  isSelected?: boolean;
};

export const ShapePokemonCard = React.memo(
  ({ pokemon, isSelected = false, onClick }: Props): JSX.Element => {
    const handleClick = (): void => {
      if (pokemon && onClick) {
        onClick(pokemon.id);
      }
    };

    return (
      <Container onClick={handleClick} data-selected={isSelected}>
        <ImageBox>
          <Image src={pokemon?.pokemonsprites.at(0)?.sprites} data-empty={!pokemon} />
        </ImageBox>
        <NameBox>
          <TitleH5 data-empty={!pokemon} ellipsis capitalize>
            {pokemon?.name}
          </TitleH5>
        </NameBox>
      </Container>
    );
  },
);

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  margin: 0 12px;
  width: 86px;
  height: 122px;

  cursor: pointer;
  background: linear-gradient(
    215.78deg,
    #b57e10 -124.09%,
    #b57e10 -78.76%,
    #f9df7b -35.76%,
    #fff3a6 8.4%,
    #f9df7b 50.24%,
    #b57e10 99.06%
  );
  border-radius: 18px;

  &[data-selected='false'] {
    opacity: 0.5;
  }

  @media ${({ theme }) => theme.breakpoints.desktop} {
    width: 128px;
    height: 180px;
    margin: 0 20px;
  }
`;

const NameBox = styled.div`
  position: relative;
  bottom: -1px;
  width: 100%;
  background: ${({ theme }) => theme.gradients.vertical.gray};
  border-radius: 16px;
  filter: drop-shadow(4px 4px 4px rgba(33, 33, 33, 0.1));

  padding: 10px 5px 4px;
  height: 35px;

  @media ${({ theme }) => theme.breakpoints.desktop} {
    padding: 19px 8px 12px;
    height: 52px;
  }
`;

const ImageBox = styled.div`
  z-index: 10;
  position: absolute;
  top: -10%;
  left: -15%;
  width: 130%;
`;

const Image = styled(Img)`
  width: 100%;

  &[data-empty='true'] {
    display: none;
  }
`;
