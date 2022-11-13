import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../containers/Layout/common/hooks';

import DummyTVShowGenres from './components/DummyUserTVShowGenres';
import DummyMovieGenres from './components/DummyUserMovieGenres';

const UserDummyGenres: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<DummyMovieGenres />

			<DummyTVShowGenres />
		</VStack>
	);
};

export default UserDummyGenres;
