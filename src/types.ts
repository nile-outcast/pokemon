import { ColorNameType, typeColors } from './theme';

export type ThemeType = 'light' | 'dark';

export type CorePokemon = {
  id: number;
  name: string;

  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemoncolor: {
      name: ColorNameType;
    };
  };
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: keyof typeof typeColors;
    };
  }[];
  pokemon_v2_pokemonstats: {
    base_stat: number;
    pokemon_v2_stat: {
      id: keyof typeof Stats;
    };
  }[];
  pokemon_v2_pokemonsprites: { sprites: string };
};

export type FullPokemon = CorePokemon & {
  base_experience: number;
  pokemon_v2_pokemonspecy: {
    generation_id: number;
  };
  pokemon_v2_pokemonabilities: {
    pokemon_v2_ability: {
      name: string;
    };
  }[];
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
