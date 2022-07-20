const colorName = [
  'black',
  'blue',
  'brown',
  'gray',
  'green',
  'pink',
  'purple',
  'red',
  'white',
  'yellow',
] as const;

export type ColorNameType = typeof colorName[number];
type BaseGradients = Record<ColorNameType, string>;

const horizontal: BaseGradients = {
  green: `linear-gradient(270deg, #64D368 0.15%, #64D368 70.88%)`,
  blue: `linear-gradient(270deg, #5BC7FA 0.15%, #35BAFF 100%)`,
  pink: `linear-gradient(270deg, #F89EAE 0.15%, #F4B5C1 100%)`,
  red: `linear-gradient(270deg, #B33327 0.15%, #D93E30 100%)`,
  yellow: `linear-gradient(270deg, #F2CB07 0.15%, #F2B807 100%)`,
  brown: '',
  gray: '',
  purple: '',
  white: '#F2F2F2',
  black: '#212121',
};

const vertical: BaseGradients = {
  green: `linear-gradient(180deg, #64A368 0.15%, #64D368 100%)`,
  blue: '',
  pink: '',
  red: `linear-gradient(180deg, #732119 42.19%, #D93E30 100%)`,
  yellow: `linear-gradient(180deg, #F5DB13 0%, #F2B807 100%)`,
  brown: '',
  gray: `linear-gradient(180deg, #FFFFFF 30.32%, #F5F5F5 100%)`,
  purple: '',
  white: '',
  black: '',
};

export const gradients: Record<'horizontal' | 'vertical', BaseGradients> = {
  horizontal,
  vertical,
};
