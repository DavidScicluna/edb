import { ButtonProps as CUIButtonProps } from '@chakra-ui/react';

import { Icon, ButtonSize, ColorMode } from '../../../common/types/types';
import { Color } from '../../../theme/types';

export type ButtonRef = HTMLButtonElement | null;

type Variant = 'text' | 'outlined' | 'contained';

export type ButtonProps = {
  color?: Color;
  colorMode?: ColorMode;
  leftIcon?: Icon;
  rightIcon?: Icon;
  size?: ButtonSize;
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
