import { BadgeProps as CUIBadgeProps } from '@chakra-ui/react';

import { Color } from '../../theme/types';

export type BadgeProps = {
  label: string;
  color?: Color;
  size?: 'xs' | 'sm' | 'md' | 'lg';
} & Omit<CUIBadgeProps, 'color' | 'colorScheme' | 'size'>;
