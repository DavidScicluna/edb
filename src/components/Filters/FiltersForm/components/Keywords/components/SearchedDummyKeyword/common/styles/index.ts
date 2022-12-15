import { memoize, merge } from 'lodash';

import { colorMode as defaultColorMode } from '../../../../../../../../../common/data/defaultPropValues';

import listItem from './keyword';
import dark from './dark';
import light from './light';
import { SearchedDummyKeywordStyleProps, SearchedDummyKeywordStyleReturn } from './types';

export default memoize((props: SearchedDummyKeywordStyleProps): SearchedDummyKeywordStyleReturn => {
	const { theme, colorMode = defaultColorMode } = props;

	const scheme = colorMode === 'light' ? light : dark;

	return { keyword: merge(listItem({ theme }), scheme({ theme })) };
});
