import { Theme, FontSize } from '@davidscicluna/component-library';

import { memoize } from 'lodash';

import { getFontSizeHeight } from '../../../../common/utils';
import { RatingSize } from '../types';

type GetIconSizeProps = { theme: Theme; size: RatingSize };

export const getIconSize = memoize(({ theme, size }: GetIconSizeProps): string => {
	return `${getFontSizeHeight({ theme, fontSize: size, lineHeight: 'base' })}px`;
});

type GetCountSizeProps = { size: RatingSize };

export const getCountSize = memoize(({ size }: GetCountSizeProps): FontSize => {
	switch (size) {
		case 'sm':
			return 'xs';
		case 'lg':
			return 'xs';
		case 'xl':
			return 'sm';
		case '2xl':
			return 'sm';
		case '3xl':
			return 'md';
		case '4xl':
			return 'md';
		default:
			return 'xs';
	}
});
