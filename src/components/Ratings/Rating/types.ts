import { Nullable } from '@davidscicluna/component-library';

import { StackProps } from '@chakra-ui/react';

import { RatingSize } from '../common/types';

export type Rating = Nullable<number | string>;

export type Count = Nullable<number>;

export type RatingProps = Omit<StackProps, 'children' | 'direction'> & {
	rating?: Rating;
	count?: Count;
	inView?: boolean;
	isLoading?: boolean;
	size?: RatingSize;
};
