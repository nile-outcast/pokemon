import { QueryResult, useQuery } from '@apollo/client';

import { Get_Pokemons } from './queries';

type Pokemon = {
  id: number;
  name: string;
};

type GetPokemonsData = {
  pokemon_v2_pokemon: Pokemon[];
};

type GetPokemonsVars = {
  limit?: number
  offset: number
};

export const useGetPokemons = (
  { limit = 9, offset }: GetPokemonsVars,
): QueryResult<GetPokemonsData, GetPokemonsVars> => {
  return useQuery<GetPokemonsData, GetPokemonsVars>(Get_Pokemons, {
    variables: { limit, offset },
  });
};
