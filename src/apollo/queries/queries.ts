import { gql } from '@apollo/client';

const POKEMON_WHERE = `
  where: {
    name: { _iregex: $name }
    pokemontypes: { type: { name: { _iregex: $types } } }
    base_experience: { _gte: $experienceFrom, _lte: $experienceTo }
    pokemonstats: {
      base_stat: { _gte: $attackFrom, _lte: $attackTo }
      stat: { id: { _eq: 2 } }
    }
  }
`;

const Core_Pokemon = gql`
  fragment CorePokemon on pokemon {
    id
    name
    pokemonsprites {
      sprites
    }
    pokemonspecy {
      pokemoncolor {
        name
      }
    }
    pokemontypes {
      type {
        name
      }
    }
    pokemonstats {
      base_stat
      stat {
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
    $types: String
    $experienceFrom: Int
    $experienceTo: Int
    $attackFrom: Int
    $attackTo: Int
  ) {
    pokemon(
      limit: $limit
      offset: $offset
      ${POKEMON_WHERE}
    ) {
      ...CorePokemon
    }
    pokemon_aggregate(${POKEMON_WHERE}) {
      aggregate {
        count
      }
    }
  }
`;

export const Get_Pokemon_By_Id = gql`
  ${Core_Pokemon}
  query GetPokemonById($id: Int!) {
    pokemon(where: { id: { _eq: $id } }, limit: 1) {
      ...CorePokemon

      base_experience

      pokemonspecy {
        generation_id
        pokemonspeciesflavortexts(where: { language_id: { _in: 9 } }) {
          flavor_text
          language_id
        }
      }

      pokemonabilities {
        ability {
          name
        }
      }
    }
  }
`;

export const Get_Pokemons_Shape = gql`
  query GetPokemonsShape {
    pokemonshape {
      id
    }
  }
`;

export const Get_Pokemons_Shape_By_Id = gql`
  ${Core_Pokemon}
  query GetPokemonsShapeById($id: Int!) {
    pokemonshape(where: { id: { _eq: $id } }, limit: 1) {
      id
      name
      pokemonspecies {
        pokemons {
          ...CorePokemon
        }
      }
    }
  }
`;
