import { StackProps } from '@chakra-ui/react';

import { RatingSize } from '../common/types';

export type DummyRatingProps = Omit<StackProps, 'children' | 'direction'> & {
	hasCount?: boolean;
	size?: RatingSize;
};
