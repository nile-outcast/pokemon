import { makeVar, useReactiveVar } from '@apollo/client';
import { GetPokemonsVars } from 'src/apollo/types';

export const initialRange: GetPokemonsVars['attack'] = { from: 0, to: 1000 };

type QueryParams = Omit<GetPokemonsVars, 'limit'>;

const initialVars: QueryParams = {
  offset: 0,
  name: '',
  types: [],
  experience: { ...initialRange },
  attack: { ...initialRange },
};

const toNumber = (value: string | null, fallback: number): number => {
  const parsed = Number(value);

  return value && Number.isFinite(parsed) ? parsed : fallback;
};

export const parseQueryParams = (search: string): QueryParams => {
  const searchParams = new URLSearchParams(search);

  return {
    offset: toNumber(searchParams.get('offset'), initialVars.offset),
    name: searchParams.get('name') ?? initialVars.name,
    types: searchParams.get('types')?.split(',').filter(Boolean) ?? [],
    experience: {
      from: toNumber(searchParams.get('experienceFrom'), initialRange.from),
      to: toNumber(searchParams.get('experienceTo'), initialRange.to),
    },
    attack: {
      from: toNumber(searchParams.get('attackFrom'), initialRange.from),
      to: toNumber(searchParams.get('attackTo'), initialRange.to),
    },
  };
};

export const buildQueryString = (params: QueryParams): string => {
  const searchParams = new URLSearchParams();

  // Значения по умолчанию не пишем, чтобы адресная строка оставалась короткой.
  if (params.offset !== initialVars.offset) searchParams.set('offset', String(params.offset));
  if (params.name) searchParams.set('name', params.name);
  if (params.types.length) searchParams.set('types', params.types.join(','));

  if (params.experience.from !== initialRange.from) {
    searchParams.set('experienceFrom', String(params.experience.from));
  }

  if (params.experience.to !== initialRange.to) {
    searchParams.set('experienceTo', String(params.experience.to));
  }

  if (params.attack.from !== initialRange.from) {
    searchParams.set('attackFrom', String(params.attack.from));
  }

  if (params.attack.to !== initialRange.to) {
    searchParams.set('attackTo', String(params.attack.to));
  }

  // Запятая в types валидна в query-строке и читается лучше, чем %2C.
  const query = searchParams.toString().replace(/%2C/g, ',');

  return query ? `?${query}` : '';
};

// Читаем адресную строку синхронно, чтобы первая отрисовка уже использовала
// фильтры из URL и не делала лишний запрос со значениями по умолчанию.
export const setQueryParams = makeVar<QueryParams>(parseQueryParams(window.location.search));

export const useQueryParams = (): QueryParams => useReactiveVar(setQueryParams);
