import { SkeletonTextProps as CUISkeletonTextProps } from '@chakra-ui/react';

import { Color, FontSizes } from '../../../theme/types';

export type SkeletonTextProps = {
  color?: keyof Color;
  fontSize?: keyof FontSizes;
} & Omit<CUISkeletonTextProps, 'colorScheme' | 'color' | 'fadeDuration' | 'fontSize' | 'size' | 'speed' | 'variant'>;
