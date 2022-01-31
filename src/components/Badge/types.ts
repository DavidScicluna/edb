import { ReactNode } from 'react';

import { ColorMode, BadgeProps as CUIBadgeProps } from '@chakra-ui/react';

import { Icon } from '../../common/types';
import { Color, FontSizes } from '../../theme/types';

export type Variant = 'contained' | 'outlined' | 'text';

export type Size = keyof Omit<FontSizes, '5xl' | '6xl' | '7xl' | '8xl' | '9xl'>;

export type IconProps = {
  color?: keyof Color;
  colorMode?: ColorMode;
  height?: string;
  fontSize?: string;
};

export type BadgeProps = {
  children: ReactNode;
  color?: keyof Color;
  colorMode?: ColorMode;
  renderLeftIcon?: (props: IconProps) => Icon;
  renderRightIcon?: (props: IconProps) => Icon;
  isLight?: boolean;
  size?: Size;
  variant?: Variant;
} & Omit<CUIBadgeProps, 'colorScheme' | 'size' | 'variant'>;
