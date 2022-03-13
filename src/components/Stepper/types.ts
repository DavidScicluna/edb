import { ColorMode, StackProps } from '@chakra-ui/react';

import { Color } from '../../theme/types';

export type StepperContext = {
	activeStep: number;
	color: keyof Omit<Color, 'gray' | 'red' | 'green' | 'yellow'>;
	colorMode: ColorMode;
	onChange: (index: number) => void;
	onCancel: () => void;
	onSubmit: () => void;
};

export type StepperRef = HTMLDivElement | null;

export type StepperProps = StepperContext & Omit<StackProps, 'onChange'>;
