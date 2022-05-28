/* eslint-disable @typescript-eslint/no-explicit-any */

import { Color } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';
import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form';

export type UsernameProps = {
	field: ControllerRenderProps<any, 'username'>;
	fieldState: ControllerFieldState;
	color: Color;
	colorMode: ColorMode;
};
