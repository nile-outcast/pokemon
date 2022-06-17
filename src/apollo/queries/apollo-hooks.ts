import { QueryResult, useQuery } from '@apollo/client';
import { CorePokemon, FullPokemon } from 'src/types';

import { GetPokemonsVars } from '../types';
import { Get_Pokemon_By_Id, Get_Pokemons } from './queries';

type GetPokemonsData = {
  pokemon_v2_pokemon: CorePokemon[];
};

type GetPokemonsQueryVars = Omit<GetPokemonsVars, 'types'> & { types: string };

export const useGetPokemons = (
  vars: GetPokemonsVars,
): QueryResult<GetPokemonsData, GetPokemonsQueryVars> =>
  useQuery<GetPokemonsData, GetPokemonsQueryVars>(Get_Pokemons, {
    variables: { ...vars, types: vars.types.join('|') },
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
