/* eslint-disable @typescript-eslint/no-explicit-any */

import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form';

import { ColorMode } from '@chakra-ui/react';

import { Color } from '../../../../theme/types';

export type PasswordProps = {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	label?: string;
	color: keyof Color;
	colorMode: ColorMode;
};
