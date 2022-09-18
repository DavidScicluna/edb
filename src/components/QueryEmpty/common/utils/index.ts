import { memoize } from 'lodash';

type GetEmptySubtitleProps = { type: 'empty' | 'error'; label: string; isMultiple?: boolean };

export const getEmptySubtitle = memoize(({ type, label, isMultiple = true }: GetEmptySubtitleProps): string => {
	switch (type) {
		case 'empty':
			return `Unfortunately, wasn't able to find ${
				isMultiple ? 'any' : 'the'
			} ${label}. Try again by pressing the "Try again" Button or please try again later!`;
		case 'error':
			return `Unfortunately, something went wrong when trying to fetch ${label}. Try again by pressing the "Try again" Button or please try again later!`;
	}
});
