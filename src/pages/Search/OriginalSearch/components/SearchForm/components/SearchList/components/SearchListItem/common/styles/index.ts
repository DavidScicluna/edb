import { memoize, merge } from 'lodash';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../../../../common/data/defaultPropValues';
import { variant as defaultVariant } from '../data/defaultPropValues';

import listItem from './listItem';
import dark from './dark';
import light from './light';
import { SearchListItemStyleProps, SearchListItemStyleReturn } from './types';

export default memoize((props: SearchListItemStyleProps): SearchListItemStyleReturn => {
	const { theme, color = defaultColor, colorMode = defaultColorMode, variant = defaultVariant } = props;

	const scheme = colorMode === 'light' ? light : dark;

	return { listItem: merge(listItem({ theme }), scheme[variant]({ theme, color })) };
});
