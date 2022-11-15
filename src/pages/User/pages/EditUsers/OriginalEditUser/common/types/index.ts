import { ColorMode } from '@chakra-ui/react';

import { UserThemeColor } from '../../../../../../../store/slices/Users/types';

export type EditUserCommonProps = {
	color: UserThemeColor;
	colorMode: ColorMode;
};
