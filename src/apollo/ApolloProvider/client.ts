import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

const keyArgs = ['where', ['id', 'name', 'pokemontypes', 'base_experience', 'pokemonstats']];

export const client = new ApolloClient({
  uri: 'https://graphql.pokeapi.co/v1beta2',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon: offsetLimitPagination(keyArgs),
        },
      },

      pokemon: {
        fields: {
          pokemonsprites: {
            merge: (existing, incoming) =>
              existing && !Array.isArray(existing) ? existing : incoming,
          },
        },
      },
    },
  }),
});
