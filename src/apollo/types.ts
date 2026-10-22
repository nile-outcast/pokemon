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

  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemoncolor: {
      name: ColorNameType;
    };
  };
  pokemon_v2_pokemontypes: Array<{
    pokemon_v2_type: {
      name: ColorTypeKey;
    };
  }>;
  pokemon_v2_pokemonstats: Array<{
    base_stat: number;
    pokemon_v2_stat: {
      id: StatKey;
    };
  }>;
  pokemon_v2_pokemonsprites: { sprites: string };
};

export type FullPokemon = CorePokemon & {
  base_experience: number;
  pokemon_v2_pokemonspecy: {
    generation_id: number;
    pokemon_v2_pokemonspeciesflavortexts: Array<{
      flavor_text: string;
      language_id: number;
    }>;
  };
  pokemon_v2_pokemonabilities: Array<{
    pokemon_v2_ability: {
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
