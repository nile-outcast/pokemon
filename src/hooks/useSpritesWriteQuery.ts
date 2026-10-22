import { gql, useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { BASE_IMAGE_URL } from 'src/api';
import { CorePokemon } from 'src/apollo/types';

const Sprites_Query = gql`
  query SpritesQuery($id: Int) {
    pokemon(where: { id: { _eq: $id } }, limit: 1) {
      id
      pokemonsprites
    }
  }
`;

const getDataForSpritesQuery = (id: number): Record<string, unknown> => {
  return {
    pokemon: [
      {
        __typename: 'pokemon',
        id,
        pokemonsprites: {
          sprites: `${BASE_IMAGE_URL}${id}.png`,
        },
      },
    ],
  };
};

export const useSpritesWriteQuery = (pokemon?: CorePokemon): void => {
  const client = useApolloClient();

  useEffect(() => {
    if (pokemon && Array.isArray(pokemon.pokemonsprites)) {
      client.writeQuery({
        query: Sprites_Query,
        variables: { id: pokemon.id },
        data: getDataForSpritesQuery(pokemon.id),
      });
    }
  }, [client, pokemon]);
};
