import { colors } from './colors';

export type DynamicTheme = {
  headerBG: string
  color: string
  activeLinkColor: string
  searchBG: string
  pokedexBG: string
  iconBG: string
}

export const dynamicTheme: {[key: string]: DynamicTheme} = {
  light: {
    headerBG: colors.third,    
    color: colors.black,
    activeLinkColor: colors.black,
    searchBG: colors.gray1,
    pokedexBG: colors.white,
    iconBG: colors.black,
  },

  dark: {
    headerBG: colors.gray3,
    color: colors.gray2,
    activeLinkColor: colors.third,
    searchBG: colors.gray3,
    pokedexBG: colors.black,
    iconBG: colors.white,
  },
};
