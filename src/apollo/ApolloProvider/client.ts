import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
// import { BASE_IMAGE_URL } from 'src/api';
// import { CorePokemon } from 'src/types';

const keyArgs = [
  'where',
  ['name', 'pokemon_v2_pokemontypes', 'base_experience', 'pokemon_v2_pokemonstats'],
];

export const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache({
    typePolicies: {
      Pokemon: {
        keyFields: ['pokemon_v2_pokemonsprites'],
        fields: {
          pokemon_v2_pokemon: offsetLimitPagination(keyArgs),
          // {
          //   keyArgs: keyArgs,
          //   merge: (existing: CorePokemon[] = [], incoming: CorePokemon[]) => {
          //     // const incomingWithSprites = incoming.map((pokemon): CorePokemon => {
          //     //   // eslint-disable-next-line no-console
          //     //   console.log('pok: ', pokemon);
          //     //   return {
          //     //     ...pokemon,
          //     //     pokemon_v2_pokemonsprites: {
          //     //       sprites: `${BASE_IMAGE_URL}${pokemon?.id}.png`,
          //     //     },
          //     //   };
          //     // });

          //     return [...existing, ...incoming];
          //   },
          // },
        },
      },
    },
  }),
});
