import { Color, FontSizes } from '../../../theme/types';
import { SkeletonProps } from '../types';

export type SkeletonTextProps = {
  color?: keyof Color;
  fontSize?: keyof FontSizes & string;
} & SkeletonProps;
