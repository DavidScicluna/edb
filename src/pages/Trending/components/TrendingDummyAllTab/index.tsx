import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../containers/Layout/common/hooks';

import TrendingDummyAllTabMovies from './components/TrendingDummyAllTabMovies';
import TrendingDummyAllTabPeople from './components/TrendingDummyAllTabPeople';
import TrendingDummyAllTabTVShows from './components/TrendingDummyAllTabTVShows';

const TrendingDummyAllTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<TrendingDummyAllTabMovies />

			<TrendingDummyAllTabTVShows />

			<TrendingDummyAllTabPeople />
		</VStack>
	);
};

export default TrendingDummyAllTab;
