import { ColorNameType, ColorTypeKey } from 'src/theme';

type Range = {
  from: number;
  to: number;
};

export type GetPokemonsVars = {
  limit: number;
  offset: number;
  name: string;
  experience: Range;
  attack: Range;
  types: Array<string>;
};

export type CorePokemon = {
  id: number;
  name: string;

  pokemonspecy: {
    pokemoncolor: {
      name: ColorNameType;
    };
  };
  pokemontypes: Array<{
    type: {
      name: ColorTypeKey;
    };
  }>;
  pokemonstats: Array<{
    base_stat: number;
    stat: {
      id: StatKey;
    };
  }>;
  pokemonsprites: { sprites: string };
};

export type FullPokemon = CorePokemon & {
  base_experience: number;
  pokemonspecy: {
    generation_id: number;
    pokemonspeciesflavortexts: Array<{
      flavor_text: string;
      language_id: number;
    }>;
  };
  pokemonabilities: Array<{
    ability: {
      name: string;
    };
  }>;
};

export const Stats = {
  1: 'Healthy Points',
  2: 'Attack',
  3: 'Defense',
  4: 'Special Attack',
  5: 'Special Defense',
  6: 'Speed',
  7: 'Experience',
} as const;

export type StatKey = keyof typeof Stats;

export type StatValue = typeof Stats[StatKey];
