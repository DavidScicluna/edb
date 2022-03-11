import { FontSizes } from '../../../theme/types';
import { SkeletonProps } from '../types';

export type SkeletonTextProps = {
	fontSize?: keyof FontSizes & string;
} & SkeletonProps;
