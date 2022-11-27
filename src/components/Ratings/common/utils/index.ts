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
			return 'md';
		case 'xl':
			return 'lg';
		case '2xl':
			return 'xl';
		case '3xl':
			return '2xl';
		case '4xl':
			return '3xl';
		default:
			return 'sm';
	}
});
