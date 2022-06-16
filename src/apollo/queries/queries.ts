import { gql } from '@apollo/client';

export const Core_Pokemon = gql`
  fragment CorePokemon on pokemon_v2_pokemon {
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
      pokemon_v2_stat {
        id
      }
    }
  }
`;

export const Get_Pokemons = gql`
  ${Core_Pokemon}
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
      ...CorePokemon
    }      
  }
`;

export const Get_Pokemon_By_Id = gql`
  ${Core_Pokemon}
  query GetPokemonById(
    $id: Int!
  ) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      ...CorePokemon
 
      base_experience

      pokemon_v2_pokemonspecy {
        generation_id
      }

      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
    }    
  }
`;
