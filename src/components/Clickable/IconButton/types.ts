import { ColorMode, IconButtonProps as CUIIconButtonProps } from '@chakra-ui/react';

import { Icon } from '../../../common/types';
import { Color } from '../../../theme/types';

export type IconButtonRef = HTMLButtonElement | null;

export type Size = 'sm' | 'md' | 'lg';

export type Variant = 'contained' | 'outlined' | 'icon';

export type IconButtonProps = {
  children: Icon;
  color?: keyof Color;
  colorMode?: ColorMode;
  size?: Size;
  variant?: Variant;
  sx?: {
    back?: CUIIconButtonProps['sx'];
    front?: CUIIconButtonProps['sx'];
  };
} & Omit<
  CUIIconButtonProps,
  'color' | 'colorScheme' | 'icon' | 'isActive' | 'isRound' | 'spinner' | 'spinnerPlacement' | 'size' | 'variant' | 'sx'
>;
