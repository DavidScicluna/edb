/* eslint-disable @typescript-eslint/no-explicit-any */

import { Color } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';
import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form';

export type PasswordProps = {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	label?: string;
	color: Color;
	colorMode: ColorMode;
};
