import * as React from 'react';
import { useGetPokemonsShapeById } from 'src/apollo/queries/apollo-hooks';
import { CorePokemon } from 'src/apollo/types';
import { TitleH1 } from 'src/components/ui';
import { ArrowCarousel } from 'src/components/ui/icons/ArrowCarousel';
import { dataValidation, getTextFormat } from 'src/utils';
import styled from 'styled-components';

import { CurrentPokemonCard } from './CurrentPokemonCard';
import { ShapePokemonCard } from './ShapePokemonCard';

type Props = {
  id: number;
};

export const Shape = ({ id }: Props): JSX.Element => {
  const { data } = useGetPokemonsShapeById({ id });

  const pokemons = React.useMemo(
    () =>
      data?.pokemon_v2_pokemonshape_by_pk.pokemon_v2_pokemonspecies.reduce(
        (pokemons: Array<CorePokemon>, pokemonspecy) => {
          pokemonspecy.pokemon_v2_pokemons.forEach((pokemon) => pokemons.push(pokemon));
          return pokemons;
        },
        [],
      ),
    [data?.pokemon_v2_pokemonshape_by_pk.pokemon_v2_pokemonspecies],
  );

  const [currentPokemon, setCurrentPokemon] = React.useState(0);

  React.useEffect(() => {
    if (pokemons) setCurrentPokemon((prev) => (prev === 0 ? pokemons[0].id : prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);

  return (
    <>
      <Content>
        <ShapeTitle data-empty={!data}>
          {getTextFormat(data?.pokemon_v2_pokemonshape_by_pk.name)}
        </ShapeTitle>
        <Line />

        <CurrentPokemonCard id={currentPokemon} />
      </Content>

      <CarouselBox>
        <ArrowBox>
          <Arrow />
        </ArrowBox>

        <Carousel>
          {dataValidation(pokemons, 6).map((pokemon, idx) => (
            <div key={pokemon?.id || idx}>
              <ShapePokemonCard
                pokemon={pokemon}
                onClick={() => pokemon && setCurrentPokemon(pokemon.id)}
              />
            </div>
          ))}
        </Carousel>

        <ArrowBox data-right>
          <Arrow />
        </ArrowBox>
      </CarouselBox>
    </>
  );
};

const Content = styled.div`
  padding: 24px 24px;

  @media ${({ theme }) => theme.breakpoints.desktop} {
    padding: 40px 158px 24px;
  }
`;

const Line = styled.div`
  margin-right: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.dynamicTheme.color};

  @media ${({ theme }) => theme.breakpoints.mobile} {
    margin-right: 12px;
  }
`;

const ShapeTitle = styled(TitleH1)`
  margin-bottom: 18px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    margin-bottom: 12px;
    font-size: 44px;
    line-height: 51px;
  }

  &[data-empty='true'] {
    width: 40%;
  }
`;

const CarouselBox = styled.div`
  display: flex;
  margin: 0 8px;

  @media ${({ theme }) => theme.breakpoints.desktop} {
    margin: 0 158px;
  }
`;

const Carousel = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;

  padding: 12px 0;
  margin: 0 24px;

  ::-webkit-scrollbar {
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.dynamicTheme.color}80;
    border-radius: 999px;
  }
`;

const Arrow = styled(ArrowCarousel)`
  width: 20px;
  height: 32px;

  @media ${({ theme }) => theme.breakpoints.desktop} {
    width: 30px;
    height: 48px;
  }
`;

const ArrowBox = styled.div`
  display: flex;
  align-items: center;

  &[data-right='true'] {
    & > svg {
      transform: rotate(180deg);
    }
  }
`;
