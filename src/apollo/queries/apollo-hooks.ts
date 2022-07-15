import { QueryResult, useQuery } from '@apollo/client';
import { CorePokemon, FullPokemon } from 'src/types';

import { GetPokemonsVars } from '../types';
import { Get_Pokemon_By_Id, Get_Pokemons, Get_Pokemons_Shape } from './queries';

type GetPokemonsData = {
  pokemon_v2_pokemon: CorePokemon[];
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
    notifyOnNetworkStatusChange: true,
  });

type GetPokemonByIdVars = {
  id: number;
};

type GetPokemonByIdData = {
  pokemon_v2_pokemon_by_pk: FullPokemon;
};

export const useGetPokemonById = (
  vars: GetPokemonByIdVars,
): QueryResult<GetPokemonByIdData, GetPokemonByIdVars> =>
  useQuery<GetPokemonByIdData, GetPokemonByIdVars>(Get_Pokemon_By_Id, {
    variables: vars,
  });

type GetPokemonsShapeData = {
  pokemon_v2_pokemonshape: {
    id: number;
    name: string;
    pokemon_v2_pokemonspecies: {
      pokemon_v2_pokemons: CorePokemon[];
    }[];
  }[];
};

export const useGetPokemonsShape = (): QueryResult<GetPokemonsShapeData> =>
  useQuery<GetPokemonsShapeData>(Get_Pokemons_Shape);
