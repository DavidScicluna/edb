import theme from './index';

export type Theme = typeof theme;

type Colors = Omit<
  Theme['colors'],
  | 'transparent'
  | 'current'
  | 'black'
  | 'white'
  | 'whiteAlpha'
  | 'blackAlpha'
  | 'linkedin'
  | 'facebook'
  | 'messenger'
  | 'whatsapp'
  | 'twitter'
  | 'telegram'
>;

export type Color = keyof Colors;
