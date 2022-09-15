import { MouseEvent as ME } from 'react';

import { FontSize, Nullable } from '@davidscicluna/component-library';

import { StackProps } from '@chakra-ui/react';

export type MouseEvent = ME<HTMLDivElement, globalThis.MouseEvent>;

type RatingSize = Exclude<FontSize, '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'> & string;

export type Rating = Nullable<number | string>;

export type Count = Nullable<number>;

export type RatingProps = Omit<StackProps, 'children' | 'direction'> & {
	rating?: Rating;
	count?: Count;
	inView?: boolean;
	isLoading?: boolean;
	size?: RatingSize;
};
