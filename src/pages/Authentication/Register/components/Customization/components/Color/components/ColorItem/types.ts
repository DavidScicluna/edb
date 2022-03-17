import { ColorMode } from '@chakra-ui/react';

import { ThemeColor } from '../../../../../../../../../store/slices/Users/types';

export type ColorItemProps = {
	color: ThemeColor;
	colorMode: ColorMode;
	isActive?: boolean;
	onClick?: (color: ThemeColor) => void;
};
