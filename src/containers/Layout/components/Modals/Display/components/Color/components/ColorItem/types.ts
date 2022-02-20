import { ColorMode } from '@chakra-ui/react';

import { Form } from '../../../../types';

export type ColorItemProps = {
	color: Form['color'];
	colorMode: ColorMode;
	isActive?: boolean;
	onClick?: (color: Form['color']) => void;
};
