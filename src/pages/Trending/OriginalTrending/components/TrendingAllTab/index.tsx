import { FC, lazy } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { Suspense } from '../../../../../components';
import TrendingDummyAllTabMovies from '../../../components/TrendingDummyAllTab/components/TrendingDummyAllTabMovies';
import TrendingDummyAllTabPeople from '../../../components/TrendingDummyAllTab/components/TrendingDummyAllTabPeople';
import TrendingDummyAllTabTVShows from '../../../components/TrendingDummyAllTab/components/TrendingDummyAllTabTVShows';

import { TrendingAllTabProps } from './types';

const TrendingAllTabMovies = lazy(() => import('./components/TrendingAllTabMovies'));
const TrendingAllTabPeople = lazy(() => import('./components/TrendingAllTabPeople'));
const TrendingAllTabTVShows = lazy(() => import('./components/TrendingAllTabTVShows'));

const TrendingAllTab: FC<TrendingAllTabProps> = (props) => {
	const { spacing } = useLayoutContext();

	const { moviesInfiniteQuery, movies, tvShowsInfiniteQuery, shows, peopleInfiniteQuery, people, onTabChange } =
		props;

	return (
		<VStack width='100%' spacing={spacing}>
			<Suspense fallback={<TrendingDummyAllTabMovies />}>
				<TrendingAllTabMovies query={moviesInfiniteQuery} movies={movies} onTabChange={onTabChange} />
			</Suspense>

			<Suspense fallback={<TrendingDummyAllTabTVShows />}>
				<TrendingAllTabTVShows query={tvShowsInfiniteQuery} shows={shows} onTabChange={onTabChange} />
			</Suspense>

			<Suspense fallback={<TrendingDummyAllTabPeople />}>
				<TrendingAllTabPeople query={peopleInfiniteQuery} people={people} onTabChange={onTabChange} />
			</Suspense>
		</VStack>
	);
};

export default TrendingAllTab;
