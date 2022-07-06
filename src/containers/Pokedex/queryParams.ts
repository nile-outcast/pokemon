import { makeVar, useReactiveVar } from '@apollo/client';
import { GetPokemonsVars } from 'src/apollo/types';

export const initialRange: GetPokemonsVars['attack'] = { from: 0, to: 1000 };

const initialVars: Omit<GetPokemonsVars, 'limit'> = {
  offset: 0,
  name: '',
  types: [],
  experience: { ...initialRange },
  attack: { ...initialRange },
};

export const setQueryParams = makeVar({
  ...initialVars,
});

export const useQueryParams = (): typeof initialVars => useReactiveVar(setQueryParams);
