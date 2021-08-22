import { SkeletonTextProps as CUISkeletonTextProps } from '@chakra-ui/react';

import { Color } from '../../../theme/types';

export type SkeletonTextProps = {
  color?: Color;
  offsetY?: string | number;
} & Omit<CUISkeletonTextProps, 'colorScheme' | 'color' | 'fadeDuration' | 'size' | 'speed' | 'variant'>;
