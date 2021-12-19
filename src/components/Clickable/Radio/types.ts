import { RadioProps as CUIRadioProps } from '@chakra-ui/react';

import { ColorMode } from '../../../common/types';
import { Color } from '../../../theme/types';

export type RadioProps = { color?: Color; colorMode?: ColorMode } & Omit<
  CUIRadioProps,
  'color' | 'colorScheme' | 'iconColor' | 'size' | 'value' | 'variant'
>;
