import { QueryResult, useQuery } from '@apollo/client';

import { BasePokemonData, CorePokemon, FullPokemon, GetPokemonsVars } from '../types';
import {
  Get_Pokemon_By_Id,
  Get_Pokemon_Shapes,
  Get_Pokemons,
  Get_Pokemons_By_Shape_Id,
} from './queries';

type GetPokemonsData = {
  pokemon: Array<CorePokemon>;
  /* Общее количество покемонов */
  pokemon_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

type GetPokemonsQueryVars = Omit<GetPokemonsVars, 'types' | 'experience' | 'attack'> & {
  types: string;
  experienceFrom: number;
  experienceTo: number;
  attackFrom: number;
  attackTo: number;
};

export const useGetPokemons = ({
  types,
  experience,
  attack,
  ...vars
}: GetPokemonsVars): QueryResult<GetPokemonsData, GetPokemonsQueryVars> =>
  useQuery<GetPokemonsData, GetPokemonsQueryVars>(Get_Pokemons, {
    variables: {
      ...vars,
      types: types.join('|'),
      experienceFrom: experience.from,
      experienceTo: experience.to,
      attackFrom: attack.from,
      attackTo: attack.to,
    },
  });

type GetPokemonByIdVars = {
  id?: number;
};

type GetPokemonByIdData = {
  pokemon: Array<FullPokemon>;
};

export const useGetPokemonById = (
  vars: GetPokemonByIdVars,
): QueryResult<GetPokemonByIdData, GetPokemonByIdVars> =>
  useQuery<GetPokemonByIdData, GetPokemonByIdVars>(Get_Pokemon_By_Id, {
    variables: vars,
    /* без id запрашивать нечего */
    skip: !vars.id,
  });

type GetPokemonShapesVars = {
  limit: number;
  offset: number;
};

type GetPokemonShapesData = {
  pokemonshape: Array<BasePokemonData>;
  /* Общее количество форм */
  pokemonshape_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

export const useGetPokemonShapes = (
  vars: GetPokemonShapesVars,
): QueryResult<GetPokemonShapesData, GetPokemonShapesVars> =>
  useQuery<GetPokemonShapesData, GetPokemonShapesVars>(Get_Pokemon_Shapes, {
    variables: vars,
  });

type GetPokemonsByShapeIdVars = {
  shapeId?: number;
  limit: number;
  offset: number;
};

type GetPokemonsByShapeIdData = {
  pokemon: Array<CorePokemon>;
  /* Общее количество покемонов выбранной формы */
  pokemon_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

export const useGetPokemonsByShapeId = (
  vars: GetPokemonsByShapeIdVars,
): QueryResult<GetPokemonsByShapeIdData, GetPokemonsByShapeIdVars> =>
  useQuery<GetPokemonsByShapeIdData, GetPokemonsByShapeIdVars>(Get_Pokemons_By_Shape_Id, {
    variables: vars,
    /* skeleton-Shape без shapeId не должен стрелять запросом */
    skip: !vars.shapeId,
  });
