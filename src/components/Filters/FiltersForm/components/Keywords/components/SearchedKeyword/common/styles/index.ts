import { memoize, merge } from 'lodash';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../../common/data/defaultPropValues';
import { isActive as defaultIsActive } from '../data/defaultPropValues';

import listItem from './keyword';
import dark from './dark';
import light from './light';
import { SearchedKeywordStyleProps, SearchedKeywordStyleReturn } from './types';

export default memoize((props: SearchedKeywordStyleProps): SearchedKeywordStyleReturn => {
	const { theme, color = defaultColor, colorMode = defaultColorMode, isActive = defaultIsActive } = props;

	const scheme = colorMode === 'light' ? light : dark;

	return { keyword: merge(listItem({ theme }), scheme({ theme, color, isActive })) };
});
