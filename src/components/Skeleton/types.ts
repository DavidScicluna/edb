import { SkeletonProps as CUISkeletonProps } from '@chakra-ui/react';

import { Color } from '../../theme/types';

export type SkeletonProps = {
  color?: Color;
} & Omit<CUISkeletonProps, 'colorScheme' | 'color' | 'fadeDuration' | 'size' | 'speed' | 'variant'>;
