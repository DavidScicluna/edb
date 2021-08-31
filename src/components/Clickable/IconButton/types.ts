import { IconButtonProps as CUIIconButtonProps } from '@chakra-ui/react';

import { Icon, ButtonSize, ColorMode } from '../../../common/types/types';
import { Color } from '../../../theme/types';

export type IconButtonRef = HTMLButtonElement | null;

type Variant = 'icon' | 'outlined' | 'contained';

export type IconButtonProps = {
  color?: Color;
  colorMode?: ColorMode;
  icon: Icon;
  size?: ButtonSize;
  variant?: Variant;
} & Omit<
  CUIIconButtonProps,
  'color' | 'colorScheme' | 'icon' | 'isActive' | 'isRound' | 'size' | 'spinner' | 'variant'
>;
