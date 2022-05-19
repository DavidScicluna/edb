/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColorMode } from '@chakra-ui/react';

import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form';


import { Color } from '../../../../theme/types';

export type UsernameProps = {
	field: ControllerRenderProps<any, 'username'>;
	fieldState: ControllerFieldState;
	color: keyof Color;
	colorMode: ColorMode;
};
