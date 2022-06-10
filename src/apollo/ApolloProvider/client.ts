import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { Pokemon } from 'src/types';

export const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon_v2_pokemon : offsetLimitPagination([ 'where', ['name']]),
          // {
          //   keyArgs: [ 'where', ['name']],
          //   merge: (existing: Pokemon[], incoming: Pokemon[]) => {
          //     if (existing) {
          //       return [...existing, ...incoming];
          //     } else {
          //       return incoming;
          //     }
          //   },
          // },
        },
      },
    },
  }),
});
