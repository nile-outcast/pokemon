import { QueryResult, useQuery } from '@apollo/client';

import { BasePokemonData, CorePokemon, FullPokemon, GetPokemonsVars } from '../types';
import {
  Get_Pokemon_By_Id,
  Get_Pokemons,
  Get_Pokemons_Shape,
  Get_Pokemons_Shape_By_Id,
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
  id: number;
};

type GetPokemonByIdData = {
  pokemon: Array<FullPokemon>;
};

export const useGetPokemonById = (
  vars: GetPokemonByIdVars,
): QueryResult<GetPokemonByIdData, GetPokemonByIdVars> =>
  useQuery<GetPokemonByIdData, GetPokemonByIdVars>(Get_Pokemon_By_Id, {
    variables: vars,
  });

type GetPokemonsShapeData = {
  pokemonshape: Array<BasePokemonData>;
};

export const useGetPokemonsShape = (): QueryResult<GetPokemonsShapeData> =>
  useQuery<GetPokemonsShapeData>(Get_Pokemons_Shape);

type GetPokemonsShapeByIdData = {
  pokemonshape: Array<
    BasePokemonData & {
      pokemonspecies: Array<{
        pokemons: Array<CorePokemon>;
      }>;
    }
  >;
};

export const useGetPokemonsShapeById = (
  vars: GetPokemonByIdVars,
): QueryResult<GetPokemonsShapeByIdData, GetPokemonByIdVars> =>
  useQuery<GetPokemonsShapeByIdData, GetPokemonByIdVars>(Get_Pokemons_Shape_By_Id, {
    variables: vars,
  });
