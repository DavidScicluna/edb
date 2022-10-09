import { Theme, Style } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

import { SearchListItemProps } from '../../types';
import { UserThemeColor } from '../../../../../../../../../../../store/slices/Users/types';

export type SearchListItemStyleProps = Pick<SearchListItemProps, 'variant'> & {
	theme: Theme;
	color: UserThemeColor;
	colorMode: ColorMode;
};

export type SearchListItemStyleReturn = {
	listItem: Style;
};
