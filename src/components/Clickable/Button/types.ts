import { ColorMode, ButtonProps as CUIButtonProps } from '@chakra-ui/react';

import { Icon } from '../../../common/types';
import { Color } from '../../../theme/types';

export type ButtonRef = HTMLButtonElement | null;

export type Size = 'sm' | 'md' | 'lg';

export type Variant = 'contained' | 'outlined' | 'text';

export type IconProps = {
  width?: string;
  height?: string;
  fontSize?: string;
};

export type ButtonProps = {
  color?: keyof Color;
  colorMode?: ColorMode;
  renderLeftIcon?: (props: IconProps) => Icon;
  renderRightIcon?: (props: IconProps) => Icon;
  size?: Size;
  variant?: Variant;
  sx?: {
    back?: CUIButtonProps['sx'];
    front?: CUIButtonProps['sx'];
  };
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
  | 'sx'
>;
