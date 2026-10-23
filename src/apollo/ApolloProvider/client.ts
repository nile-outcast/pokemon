import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

const pokemonKeyArgs = [
  'where',
  ['id', 'name', 'pokemontypes', 'base_experience', 'pokemonstats', 'pokemonspecy'],
];

const shapeKeyArgs = ['where'];

export const client = new ApolloClient({
  uri: 'https://graphql.pokeapi.co/v1beta2',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon: offsetLimitPagination(pokemonKeyArgs),
          pokemonshape: offsetLimitPagination(shapeKeyArgs),
        },
      },
    },
  }),
});
