import { QueryResult, useQuery } from '@apollo/client';
import { CorePokemon, FullPokemon } from 'src/types';

import { GetPokemonsVars } from '../types';
import { Get_Pokemon_By_Id,Get_Pokemons } from './queries';

type GetPokemonsData = {
  pokemon_v2_pokemon: CorePokemon[];
};

export const useGetPokemons = (
  { limit, offset, name }: GetPokemonsVars,
): QueryResult<GetPokemonsData, GetPokemonsVars> => 
useQuery<GetPokemonsData, GetPokemonsVars>(Get_Pokemons, {
    variables: { limit, offset, name },
    notifyOnNetworkStatusChange: true,
});

type GetPokemonByIdVars = {
  id: number
}

type GetPokemonByIdData = {
  pokemon_v2_pokemon_by_pk: FullPokemon;
};

export const useGetPokemonById = (vars: GetPokemonByIdVars): QueryResult<GetPokemonByIdData,GetPokemonByIdVars> => 
useQuery<GetPokemonByIdData, GetPokemonByIdVars>(Get_Pokemon_By_Id, {
  variables: vars,
});
