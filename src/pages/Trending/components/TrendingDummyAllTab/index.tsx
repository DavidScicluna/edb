import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../containers/Layout/common/hooks';

import TrendingDummyAllTabMovies from './components/TrendingDummyAllTabMovies';
import TrendingDummyAllTabPeople from './components/TrendingDummyAllTabPeople';
import TrendingDummyAllTabShows from './components/TrendingDummyAllTabShows';

const TrendingDummyAllTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			{/* Movies */}
			<TrendingDummyAllTabMovies />

			{/* TV Shows */}
			<TrendingDummyAllTabShows />

			{/* People */}
			<TrendingDummyAllTabPeople />
		</VStack>
	);
};

export default TrendingDummyAllTab;
