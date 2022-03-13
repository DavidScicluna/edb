import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Credentials from './components/Credentials';
import Info from './components/Info';
import { DetailsProps } from './types';

const Details = ({ form }: DetailsProps): ReactElement => {
	return (
		<VStack width='100%' spacing={4}>
			<Credentials form={form} />
			<Info form={form} />
		</VStack>
	);
};

export default Details;
