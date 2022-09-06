import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import TVShowGenres from './components/TVShowGenres';
import MovieGenres from './components/MovieGenres';
import { GenresStepProps } from './types';

const GenresStep: FC<GenresStepProps> = (props) => {
	return (
		<VStack width='100%' spacing={4}>
			<MovieGenres {...props} />

			<TVShowGenres {...props} />
		</VStack>
	);
};

export default GenresStep;
