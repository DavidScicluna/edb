import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Color from './components/Color';
import Background from './components/ColorMode';
import { CustomizationProps } from './types';

const Customization = ({ form }: CustomizationProps): ReactElement => {
	return (
		<VStack width='100%' spacing={4}>
			<Color form={form} />
			<Background form={form} />
		</VStack>
	);
};

export default Customization;
