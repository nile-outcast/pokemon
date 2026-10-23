import { ColorNameType, ColorTypeKey } from 'src/theme';

type Range = {
  from: number;
  to: number;
};

export type BasePokemonData<Name = string> = {
  id: number;
  name: Name;
};

export type GetPokemonsVars = {
  limit: number;
  offset: number;
  name: string;
  experience: Range;
  attack: Range;
  types: Array<string>;
};

export type CorePokemon = BasePokemonData & {
  pokemonspecy: {
    pokemoncolor: BasePokemonData<ColorNameType>;
  };
  pokemontypes: Array<{
    type: BasePokemonData<ColorTypeKey>;
  }>;
  pokemonstats: Array<{
    base_stat: number;
    stat: BasePokemonData<StatName>;
  }>;
  pokemonsprites: Array<{
    sprites: string;
  }>;
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
    ability: BasePokemonData;
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
