import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

const keyArgs = [
  'where',
  ['name', 'pokemon_v2_pokemontypes', 'base_experience', 'pokemon_v2_pokemonstats'],
];

export const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon_v2_pokemon: offsetLimitPagination(keyArgs),
        },
      },

      pokemon_v2_pokemon: {
        fields: {
          pokemon_v2_pokemonsprites: {
            merge: (existing, incoming) =>
              existing && !Array.isArray(existing) ? existing : incoming,
          },
        },
      },
    },
  }),
});
