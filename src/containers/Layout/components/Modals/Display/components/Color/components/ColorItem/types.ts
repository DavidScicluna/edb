import { ColorMode } from '@chakra-ui/react';

import { Color } from '../../types';

export type ColorItemProps = {
	background: ColorMode;
	isActive?: boolean;
	onClick?: (color: Color['value']) => void;
} & Color;
