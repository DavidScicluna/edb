import { Theme as CUITheme } from '@chakra-ui/react';

import colors from './foundations/colors';
import spacing from './foundations/spacing';
import typography from './foundations/typography';

export type ColorShades = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type Color = Omit<
  typeof colors,
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

export type Space = typeof spacing;

export type FontSizes = typeof typography.fontSizes;

export type Theme = { colors: Color; space: Space } & Omit<CUITheme, 'colors' | 'space'>;
