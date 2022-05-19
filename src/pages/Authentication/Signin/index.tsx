import React, { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import IllustrationContainer from '../components/IllustrationContainer';

import FormContainer from './components/FormContainer';


const SignIn = (): ReactElement => {
	const [isMd] = useMediaQuery('(max-width: 960px)');

	return (
		<SimpleGrid width='100%' height='100vh' columns={!isMd ? 2 : 1} spacing={0}>
			{!isMd ? <IllustrationContainer /> : null}
			<FormContainer />
		</SimpleGrid>
	);
};

export default SignIn;
