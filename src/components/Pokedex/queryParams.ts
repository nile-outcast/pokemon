import { makeVar, useReactiveVar } from '@apollo/client';
import { GetPokemonsVars } from 'src/apollo/types';

const initialVars: Omit<GetPokemonsVars, 'limit'> = {
  offset: 0,
  name: '',
  types: [],
  experience: { from: 0, to: 1000 },
  attack: { from: 0, to: 1000 },
};

export const setQueryParams = makeVar({
  ...initialVars,
});

export const useQueryParams = (): typeof initialVars => useReactiveVar(setQueryParams);
