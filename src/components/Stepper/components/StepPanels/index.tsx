import { ReactElement, useContext } from 'react';

import { Center, Fade } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion';

import { StepPanelsProps } from './types';

import { StepperContext } from '../..';
import { StepperContext as StepperContextType } from '../../types';

const StepPanels = ({ children }: StepPanelsProps): ReactElement => {
	const { activeStep = 0 } = useContext<StepperContextType>(StepperContext);

	return (
		<Center as={AnimatePresence} width='100%' exitBeforeEnter initial={false}>
			{children.map((step, index) =>
				activeStep === index ? (
					<Center key={`step_panel_${index}`} as={Fade} in width='100%' unmountOnExit>
						{step}
					</Center>
				) : null
			)}
		</Center>
	);
};

export default StepPanels;
