import { ColorMode, IconButtonProps as CUIIconButtonProps } from '@chakra-ui/react';
import { Icon } from 'react-feather';

import { Color } from '../../../theme/types';

export type IconButtonRef = HTMLButtonElement | null;

export type Size = 'sm' | 'md' | 'lg';

export type Variant = 'contained' | 'outlined' | 'icon';

export type IconButtonProps = {
  color?: keyof Color;
  colorMode?: ColorMode;
  icon: Icon;
  size?: Size;
  variant?: Variant;
} & Omit<
  CUIIconButtonProps,
  'color' | 'colorScheme' | 'icon' | 'isActive' | 'isRound' | 'spinner' | 'spinnerPlacement' | 'size' | 'variant'
>;
