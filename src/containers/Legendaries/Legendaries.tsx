import React, { Fragment } from 'react';
import { useGetPokemonsShape } from 'src/apollo/queries/apollo-hooks';
import { getTextFormat } from 'src/utils';

export const Legendaries = (): JSX.Element => {
  const { data, loading } = useGetPokemonsShape();
  // eslint-disable-next-line no-console
  console.log(data);

  return (
    <>
      {loading && <div>{'loading'}</div>}
      {data?.pokemon_v2_pokemonshape.map((shape) => (
        <Fragment key={shape.name}>
          <h2>{getTextFormat(shape.name)}</h2>
          {shape.pokemon_v2_pokemonspecies.map((pokemons) =>
            pokemons.pokemon_v2_pokemons.map((pokemon) => (
              <div key={pokemon.name}>{`${pokemon.id} ${pokemon.name}`}</div>
            )),
          )}
        </Fragment>
      ))}
    </>
  );
};
