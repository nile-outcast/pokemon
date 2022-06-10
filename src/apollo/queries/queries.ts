import { gql } from '@apollo/client';

export const Get_Pokemons = gql`
  query GetPokemons(
    $limit: Int 
    $offset: Int
    $name: String
  ) {
    pokemon_v2_pokemon(      
      limit: $limit
      offset: $offset
      where: {
        name: {_regex: $name}
      }
    ) {
        id
        name
        pokemon_v2_pokemonspecy {
          pokemon_v2_pokemoncolor {
            name
          }
        }
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        pokemon_v2_pokemonstats {
          base_stat
          id
        }
      }
  }
`;
