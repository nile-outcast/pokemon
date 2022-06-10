import { ThemeType } from 'src/types';

import { colors } from './colors';

export type DynamicTheme = {
  headerBG: string
  color: string
  statNameColor: string
  activeLinkColor: string
  searchBG: string
  pokedexBG: string
  iconBG: string
  pokemonBG: string
}

export const dynamicTheme: Record<ThemeType, DynamicTheme> = {
  light: {
    headerBG: colors.third,    
    color: colors.black,
    statNameColor: colors.gray3,
    activeLinkColor: colors.black,
    searchBG: colors.gray1,
    pokedexBG: colors.white,
    iconBG: colors.black,
    pokemonBG: colors.gray1,
  },

  dark: {
    headerBG: colors.gray3,
    color: colors.gray2,
    statNameColor: colors.gray1,
    activeLinkColor: colors.third,
    searchBG: colors.gray3,
    pokedexBG: colors.black,
    iconBG: colors.white,
    pokemonBG: colors.gray4,
  },
};
