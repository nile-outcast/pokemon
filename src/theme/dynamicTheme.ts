import { colors } from './colors';

export type DynamicTheme = {
  header: string
  color: string
  activeLinkColor: string
}

export const dynamicTheme: {[key: string]: DynamicTheme} = {
  light: {
    header: colors.third,
    color: colors.black,
    activeLinkColor: colors.black,
  },

  dark: {
    header: colors.gray2,
    color: colors.white,
    activeLinkColor: colors.third,
  },
};
