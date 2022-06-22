import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
// import { CorePokemon } from 'src/types';

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
          // {
          //   keyArgs: keyArgs,
          //   merge: (existing: CorePokemon[], incoming: CorePokemon[]) => {
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
