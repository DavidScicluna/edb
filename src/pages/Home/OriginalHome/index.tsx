import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import { usePopularQuery, useTopRatedQuery, useTrendingQuery } from '../../../common/queries';

import Popular from './components/Popular';
import TopRated from './components/TopRated';
import Trending from './components/Trending';

const Home: FC = () => {
	const { spacing } = useLayoutContext();

	const popularMoviesQuery = usePopularQuery<'movie'>({ props: { mediaType: 'movie' } });
	const popularTVShowsQuery = usePopularQuery<'tv'>({ props: { mediaType: 'tv' } });

	const topRatedMoviesQuery = useTopRatedQuery<'movie'>({ props: { mediaType: 'movie' } });
	const topRatedTVShowsQuery = useTopRatedQuery<'tv'>({ props: { mediaType: 'tv' } });

	const trendingMoviesQuery = useTrendingQuery<'movie'>({ props: { mediaType: 'movie', time: 'week' } });
	const trendingTVShowsQuery = useTrendingQuery<'tv'>({ props: { mediaType: 'tv', time: 'week' } });
	const trendingPeopleQuery = useTrendingQuery<'person'>({ props: { mediaType: 'person', time: 'week' } });

	return (
		<Page>
			<PageBody p={spacing}>
				<VStack width='100%' spacing={spacing}>
					<Popular moviesQuery={popularMoviesQuery} tvShowsQuery={popularTVShowsQuery} />
					<TopRated moviesQuery={topRatedMoviesQuery} tvShowsQuery={topRatedTVShowsQuery} />
					<Trending
						moviesQuery={trendingMoviesQuery}
						tvShowsQuery={trendingTVShowsQuery}
						peopleQuery={trendingPeopleQuery}
					/>
				</VStack>
			</PageBody>
		</Page>
	);
};

export default Home;
