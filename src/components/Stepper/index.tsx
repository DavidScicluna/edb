import { ReactElement, createContext, forwardRef } from 'react';

import { VStack } from '@chakra-ui/react';

import { StepperContext as StepperContextType, StepperRef, StepperProps } from './types';

export const StepperContext = createContext<StepperContextType>({
	activeStep: 0,
	color: 'blue',
	colorMode: 'light',
	onChange: () => undefined,
	onCancel: () => undefined,
	onSubmit: () => undefined
});

const Stepper = forwardRef<StepperRef, StepperProps>(function Stepper(props, ref): ReactElement {
	const { children, activeStep = 0, color, colorMode, onChange, onCancel, onSubmit, ...rest } = props;

	return (
		<VStack {...rest} ref={ref} width='100%' maxWidth='100%' spacing={0}>
			<StepperContext.Provider value={{ activeStep, color, colorMode, onChange, onCancel, onSubmit }}>
				{children}
			</StepperContext.Provider>
		</VStack>
	);
});

export default Stepper;
