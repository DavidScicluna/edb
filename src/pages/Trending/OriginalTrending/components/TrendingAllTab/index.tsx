import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { Suspense } from '../../../../../components';
import TrendingDummyAllTabMovies from '../../../components/TrendingDummyAllTab/components/TrendingDummyAllTabMovies';
import TrendingDummyAllTabPeople from '../../../components/TrendingDummyAllTab/components/TrendingDummyAllTabPeople';

import TrendingAllTabMovies from './components/TrendingAllTabMovies';
import TrendingAllTabPeople from './components/TrendingAllTabPeople';
import TrendingAllTabShows from './components/TrendingAllTabShows';
import { TrendingAllTabProps } from './types';

const TrendingAllTab: FC<TrendingAllTabProps> = (props) => {
	const { spacing } = useLayoutContext();

	const { moviesInfiniteQuery, movies, tvShowsInfiniteQuery, shows, peopleInfiniteQuery, people, onTabChange } =
		props;

	return (
		<VStack width='100%' spacing={spacing}>
			{/* Movies */}
			<Suspense fallback={<TrendingDummyAllTabMovies />}>
				<TrendingAllTabMovies query={moviesInfiniteQuery} movies={movies} onTabChange={onTabChange} />
			</Suspense>

			{/* TV Shows */}
			<Suspense fallback={<TrendingDummyAllTabPeople />}>
				<TrendingAllTabShows query={tvShowsInfiniteQuery} shows={shows} onTabChange={onTabChange} />
			</Suspense>

			{/* People */}
			<Suspense fallback={<TrendingDummyAllTabPeople />}>
				<TrendingAllTabPeople query={peopleInfiniteQuery} people={people} onTabChange={onTabChange} />
			</Suspense>
		</VStack>
	);
};

export default TrendingAllTab;
