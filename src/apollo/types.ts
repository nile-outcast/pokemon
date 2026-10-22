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
      name: StatName;
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

export enum StatLabel {
  hp = 'Healthy Points',
  attack = 'Attack',
  defense = 'Defense',
  'special-attack' = 'Special Attack',
  'special-defense' = 'Special Defense',
  speed = 'Speed',
}

export type StatName = keyof typeof StatLabel;
