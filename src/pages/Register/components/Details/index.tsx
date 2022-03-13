import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Credentials from './components/Credentials';
import Info from './components/Info';
import { DetailsProps } from './types';

const Details = ({ form, ...rest }: DetailsProps): ReactElement => {
	return (
		<VStack width='100%' spacing={4}>
			<Credentials {...rest} form={form} />
			<Info {...rest} form={form} />
		</VStack>
	);
};

export default Details;
