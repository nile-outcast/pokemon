import * as React from 'react';
import { useGetPokemonsByShapeId } from 'src/apollo/queries/apollo-hooks';
import { BasePokemonData } from 'src/apollo/types';
import { TitleH1 } from 'src/components/ui';
import { ArrowCarousel } from 'src/components/ui/icons/ArrowCarousel';
import { useIntersectionObserver } from 'src/hooks';
import { dataValidation } from 'src/utils';
import styled from 'styled-components';

import { CurrentPokemonCard } from './CurrentPokemonCard';
import { ShapePokemonCard } from './ShapePokemonCard';

const POKEMON_LIMIT = 10;

type Props = {
  shape?: BasePokemonData;
};

export const Shape = React.memo(({ shape }: Props): JSX.Element => {
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const { data, loading, fetchMore } = useGetPokemonsByShapeId({
    shapeId: shape?.id,
    limit: POKEMON_LIMIT,
    offset: 0,
  });

  const pokemons = data?.pokemon;

  const total = data?.pokemon_aggregate?.aggregate?.count ?? 0;
  const loaded = pokemons?.length ?? 0;
  const hasMore = loaded < total;

  const handleFetchMore = React.useCallback(() => {
    return fetchMore({ variables: { offset: loaded } });
  }, [fetchMore, loaded]);

  const { sentinelRef, isFetching } = useIntersectionObserver<HTMLDivElement>({
    fetchMoreFn: handleFetchMore,
    root: carouselRef.current,
    /* смещение вправо: догрузка начнётся до достижения конца карусели */
    rootMargin: '0px 200px 0px 0px',
    hasMore,
    loading,
  });

  const [selectedId, setSelectedId] = React.useState<number>();

  const currentPokemonId = selectedId ?? pokemons?.at(0)?.id;

  return (
    <Content>
      <ShapeTitle data-empty={!shape} ellipsis capitalize>
        {shape?.name}
      </ShapeTitle>
      <Line />

      <CurrentPokemonCard id={currentPokemonId} />

      <CarouselBox>
        <ArrowBox>
          <Arrow />
        </ArrowBox>

        <Carousel ref={carouselRef}>
          {dataValidation(pokemons, POKEMON_LIMIT).map((pokemon, idx) => (
            <div key={pokemon?.id ?? `load-${idx}`}>
              <ShapePokemonCard
                pokemon={pokemon}
                onClick={setSelectedId}
                isSelected={Boolean(currentPokemonId) && currentPokemonId === pokemon?.id}
              />
            </div>
          ))}

          {isFetching &&
            dataValidation([], 3).map((_, idx) => (
              <div key={`fetch-${idx}`}>
                <ShapePokemonCard />
              </div>
            ))}

          <Sentinel ref={sentinelRef} />
        </Carousel>

        <ArrowBox data-right>
          <Arrow />
        </ArrowBox>
      </CarouselBox>
    </Content>
  );
});

const Content = styled.div`
  padding-inline: 24px;

  @media ${({ theme }) => theme.breakpoints.desktop} {
    padding-inline: 158px;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.dynamicTheme.color};
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
  margin-inline: -16px;

  @media ${({ theme }) => theme.breakpoints.desktop} {
    margin-inline: 0;
  }
`;

const Carousel = styled.div`
  display: flex;
  width: 100%;
  padding-block: 12px;
  margin-inline: 16px;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.dynamicTheme.color}80;
    border-radius: 999px;
  }

  @media ${({ theme }) => theme.breakpoints.desktop} {
    margin-inline: 24px;
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

const Sentinel = styled.div`
  flex: none;
  width: 1px;
  align-self: stretch;
`;
