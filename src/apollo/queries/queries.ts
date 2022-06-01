import { gql } from '@apollo/client';

export const Get_Pokemons = gql`
  query GetPokemons(
    $limit: Int 
    $offset: Int
  ) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
    ) {
        id
        name  
    }
  }
`;
