import { ColorMode as CUIColorMode } from '@chakra-ui/react';

import { ThemeColor, ThemeColorMode } from '../../../../../../../../store/slices/Users/types';
import { ColorMode } from '../../types';

export type ColorModeItemProps = {
	color: ThemeColor;
	colorMode: CUIColorMode;
	isActive?: boolean;
	onClick?: (colorMode: ThemeColorMode) => void;
} & ColorMode;
