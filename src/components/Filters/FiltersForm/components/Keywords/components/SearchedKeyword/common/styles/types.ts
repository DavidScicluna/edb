import { Theme, Style } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

import { UserThemeColor } from '../../../../../../../../../store/slices/Users/types';
import { SearchedKeywordProps } from '../../types';

export type SearchedKeywordStyleProps = Pick<SearchedKeywordProps, 'isActive'> & {
	theme: Theme;
	color: UserThemeColor;
	colorMode: ColorMode;
};

export type SearchedKeywordStyleReturn = {
	keyword: Style;
};
