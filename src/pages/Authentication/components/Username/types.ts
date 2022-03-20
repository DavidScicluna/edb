/* eslint-disable @typescript-eslint/no-explicit-any */

import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form';

import { ColorMode } from '@chakra-ui/react';

import { Color } from '../../../../theme/types';

export type UsernameProps = {
	field: ControllerRenderProps<any, 'username'>;
	fieldState: ControllerFieldState;
	color: keyof Color;
	colorMode: ColorMode;
};
