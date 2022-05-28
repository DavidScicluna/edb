import { Color } from '@davidscicluna/component-library';

import { ColorMode, StackProps } from '@chakra-ui/react';

export type StepperContext = {
	activeStep: number;
	color: Exclude<Color, 'gray' | 'red' | 'green' | 'yellow'>;
	colorMode: ColorMode;
	onChange: (index: number) => void;
	onCancel: () => void;
	onSubmit: () => void;
};

export type StepperRef = HTMLDivElement | null;

export type StepperProps = StepperContext & Omit<StackProps, 'onChange'>;
