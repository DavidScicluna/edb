import { SkeletonProps as CUISkeletonProps } from '@chakra-ui/react';

import { Color } from '../../theme/types';

type SkeletonType = 'default' | 'text';

export type SkeletonProps = {
  color?: Color;
  type?: SkeletonType;
} & Omit<CUISkeletonProps, 'colorScheme' | 'color' | 'fadeDuration' | 'size' | 'speed' | 'variant'>;
