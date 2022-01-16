import { ColorMode, RadioProps as CUIRadioProps } from '@chakra-ui/react';

import { Color } from '../../../theme/types';

export type RadioProps = { color?: keyof Color; colorMode?: ColorMode } & Omit<
  CUIRadioProps,
  'color' | 'colorScheme' | 'iconColor' | 'size' | 'value' | 'variant'
>;
