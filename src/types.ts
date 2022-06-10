import { gradients, typeColors } from './theme';

export type ThemeType = 'light' | 'dark'

export type Pokemon = {
  id: number
  name: string

  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemoncolor: {
      name: keyof typeof gradients
    }
  }
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: keyof typeof typeColors
    }
  }[]
  pokemon_v2_pokemonstats: {
    base_stat: string
    id: number
  }[]
};
