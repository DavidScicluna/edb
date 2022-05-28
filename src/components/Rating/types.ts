import { FontSize } from '@davidscicluna/component-library';

export type RatingRef = HTMLDivElement | null;

type Size = Exclude<FontSize, '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'> & string;

export type Rating = number | string | undefined | null;

export type Count = number | undefined | null;

export type RatingProps = {
	children?: Rating;
	count?: Count;
	inView?: boolean;
	isLoading?: boolean;
	size?: Size;
} & Omit<Rating, 'rating'>;
