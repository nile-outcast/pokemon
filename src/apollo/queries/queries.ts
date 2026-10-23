import { gql } from '@apollo/client';

const POKEMON_WHERE = `
  where: {
    name: { _iregex: $name }
    pokemontypes: { type: { name: { _iregex: $types } } }
    base_experience: { _gte: $experienceFrom, _lte: $experienceTo }
    pokemonstats: {
      base_stat: { _gte: $attackFrom, _lte: $attackTo }
      stat: { name: { _eq: "attack" }  }
    }
  }
`;

const Core_Pokemon = gql`
  fragment CorePokemon on pokemon {
    id
    name
    pokemonsprites {
      sprites(path: "other.official-artwork.front_default")
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
        name
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

export const Get_Pokemon_Shapes = gql`
  query GetPokemonShapes($limit: Int, $offset: Int) {
    pokemonshape(limit: $limit, offset: $offset) {
      id
      name
    }
    pokemonshape_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const Get_Pokemons_By_Shape_Id = gql`
  ${Core_Pokemon}
  query GetPokemonsByShapeId($shapeId: Int, $limit: Int, $offset: Int) {
    pokemon(
      where: { pokemonspecy: { pokemon_shape_id: { _eq: $shapeId } } }
      limit: $limit
      offset: $offset
      order_by: { id: asc }
    ) {
      ...CorePokemon
    }
    pokemon_aggregate(where: { pokemonspecy: { pokemon_shape_id: { _eq: $shapeId } } }) {
      aggregate {
        count
      }
    }
  }
`;
