import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../containers/Layout/common/hooks';

import TVShowGenres from './components/UserTVShowGenres';
import MovieGenres from './components/UserMovieGenres';
import { UserGenresProps } from './types';

const UserGenres: FC<UserGenresProps> = (props) => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<MovieGenres {...props} />

			<TVShowGenres {...props} />
		</VStack>
	);
};

export default UserGenres;
