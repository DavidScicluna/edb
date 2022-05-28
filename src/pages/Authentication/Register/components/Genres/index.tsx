import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Genres from './components/Genres';
import { GenresProps } from './types';

const GenresStep = ({ form, ...rest }: GenresProps): ReactElement => {
	return (
		<VStack width='100%' spacing={4}>
			<Genres {...rest} form={form} mediaType='movie' />
			<Genres {...rest} form={form} mediaType='tv' />
		</VStack>
	);
};

export default GenresStep;
