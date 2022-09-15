import { FontSize } from '@davidscicluna/component-library';

import { StackProps } from '@chakra-ui/react';

type RatingSize = Exclude<FontSize, '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'> & string;

export type DummyRatingProps = Omit<StackProps, 'children' | 'direction'> & {
	size?: RatingSize;
};
