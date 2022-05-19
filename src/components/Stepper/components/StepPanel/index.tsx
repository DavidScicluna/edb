import React, { ReactElement, useContext } from 'react';

import { VStack } from '@chakra-ui/react';


import { StepperContext } from '../..';
import Divider from '../../../Divider';
import { StepperContext as StepperContextType } from '../../types';
import StepDescription from '../StepDescription';

import { StepPanelProps } from './types';

const StepPanel = ({ children, index, total, title, subtitle, ...rest }: StepPanelProps): ReactElement => {
	const { colorMode } = useContext<StepperContextType>(StepperContext);

	return (
		<VStack {...rest} width='100%' divider={<Divider colorMode={colorMode} />} spacing={4}>
			<StepDescription index={index} total={total} title={title} subtitle={subtitle} />

			{children}
		</VStack>
	);
};

export default StepPanel;
