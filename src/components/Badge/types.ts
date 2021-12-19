import { ColorMode, BadgeProps as CUIBadgeProps } from '@chakra-ui/react';
import { Icon } from 'react-feather';

import { Color, FontSizes } from '../../theme/types';

export type Variant = 'contained' | 'outlined' | 'text';

export type Size = keyof FontSizes;

export type BadgeProps = {
  children: string;
  color?: keyof Color;
  colorMode?: ColorMode;
  leftIcon?: Icon;
  rightIcon?: Icon;
  size?: Size;
  variant?: Variant;
} & Omit<CUIBadgeProps, 'colorScheme' | 'size' | 'variant'>;
