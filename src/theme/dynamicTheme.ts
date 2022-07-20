import { ThemeType } from 'src/types';

import { colors } from './colors';
import { gradients } from './gradients';

export type DynamicTheme = {
  headerBG: string;
  color: string;
  statNameColor: string;
  activeLinkColor: string;
  searchBG: string;
  pageBG: string;
  iconBG: string;
  pokemonBG: string;
  homeBG: string;
  arrowFill: string;
};

export const dynamicTheme: Record<ThemeType, DynamicTheme> = {
  light: {
    headerBG: colors.third,
    color: colors.black,
    statNameColor: colors.gray3,
    activeLinkColor: colors.black,
    searchBG: colors.gray1,
    pageBG: colors.white,
    iconBG: colors.black,
    pokemonBG: colors.gray1,
    homeBG: gradients.vertical.yellow,
    arrowFill: colors.third,
  } as const,

  dark: {
    headerBG: colors.gray3,
    color: colors.gray2,
    statNameColor: colors.gray1,
    activeLinkColor: colors.third,
    searchBG: colors.gray3,
    pageBG: colors.black,
    iconBG: colors.white,
    pokemonBG: colors.gray4,
    homeBG: colors.black,
    arrowFill: colors.gray1,
  } as const,
};
