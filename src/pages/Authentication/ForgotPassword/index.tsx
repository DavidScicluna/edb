import React, { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import FormContainer from './components/FormContainer';

import IllustrationContainer from '../components/IllustrationContainer';

const ForgotPassword = (): ReactElement => {
	const [isMd] = useMediaQuery('(max-width: 960px)');

	return (
		<SimpleGrid width='100%' height='100vh' columns={!isMd ? 2 : 1} spacing={0}>
			<FormContainer />
			{!isMd ? <IllustrationContainer /> : null}
		</SimpleGrid>
	);
};

export default ForgotPassword;
