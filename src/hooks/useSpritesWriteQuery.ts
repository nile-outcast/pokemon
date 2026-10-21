import { gql, useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { BASE_IMAGE_URL } from 'src/api';
import { CorePokemon } from 'src/types';

const Sprites_Query = gql`
  query SpritesQuery($id: Int) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      pokemon_v2_pokemonsprites
    }
  }
`;

const getDataForSpritesQuery = (id: number): Record<string, unknown> => {
  return {
    pokemon_v2_pokemon_by_pk: {
      __typename: 'pokemon_v2_pokemon',
      id,
      pokemon_v2_pokemonsprites: {
        sprites: `${BASE_IMAGE_URL}${id}.png`,
      },
    },
  };
};

export const useSpritesWriteQuery = (pokemon?: CorePokemon): void => {
  const client = useApolloClient();

  useEffect(() => {
    if (pokemon && Array.isArray(pokemon.pokemon_v2_pokemonsprites)) {
      client.writeQuery({
        query: Sprites_Query,
        variables: { id: pokemon.id },
        data: getDataForSpritesQuery(pokemon.id),
      });
    }
  }, [client, pokemon]);
};
