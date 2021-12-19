import { ColorMode, ButtonProps as CUIButtonProps } from '@chakra-ui/react';
import { Icon } from 'react-feather';

import { Color } from '../../theme/types';

export type ButtonRef = HTMLButtonElement | null;

export type Size = 'sm' | 'md' | 'lg';

export type Variant = 'contained' | 'outlined' | 'text';

export type ButtonProps = {
  color?: keyof Color;
  colorMode?: ColorMode;
  leftIcon?: Icon;
  rightIcon?: Icon;
  size?: Size;
  variant?: Variant;
} & Omit<
  CUIButtonProps,
  | 'color'
  | 'colorScheme'
  | 'iconSpacing'
  | 'leftIcon'
  | 'rightIcon'
  | 'isActive'
  | 'isRound'
  | 'spinner'
  | 'spinnerPlacement'
  | 'size'
  | 'variant'
>;
