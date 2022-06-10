import { QueryResult, useQuery } from '@apollo/client';
import { Pokemon } from 'src/types';

import { GetPokemonsVars } from '../types';
import { Get_Pokemons } from './queries';

type GetPokemonsData = {
  pokemon_v2_pokemon: Pokemon[];
};

export const useGetPokemons = (
  { limit, offset, name }: GetPokemonsVars,
): QueryResult<GetPokemonsData, GetPokemonsVars> => {
  return useQuery<GetPokemonsData, GetPokemonsVars>(Get_Pokemons, {
    variables: { limit, offset, name },
    notifyOnNetworkStatusChange: true,
  });
};
