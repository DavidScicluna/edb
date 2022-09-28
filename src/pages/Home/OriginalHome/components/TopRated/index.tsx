import { FC, useState } from 'react';

import { useBoolean, Center } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';
import qs from 'query-string';
import { useDebounce, useTimeout } from 'usehooks-ts';

import { useTopRatedQuery } from '../../../../../common/queries';
import HomeHorizontalGrid from '../HomeHorizontalGrid';
import { formatMediaType } from '../../../../../common/utils';

const TopRated: FC = () => {
	const { observe: ref, inView } = useInView<HTMLDivElement>({
		threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab, 250);

	const [isMoviesQueryEnabled, setIsMoviesQueryEnabled] = useBoolean();
	const [isShowsQueryEnabled, setIsShowsQueryEnabled] = useBoolean();

	// Fetching Top Rated Movies
	const {
		data: movies,
		isFetching: isFetchingMovies = false,
		isLoading: isMoviesLoading = false,
		isError: isMoviesError = false,
		isSuccess: isMoviesSuccess = false
	} = useTopRatedQuery({
		props: { mediaType: 'movie' },
		options: { enabled: isMoviesQueryEnabled }
	});

	// Fetching Top Rated TV Shows
	const {
		data: shows,
		isFetching: isFetchingShows = false,
		isLoading: isShowsLoading = false,
		isError: isShowsError = false,
		isSuccess: isShowsSuccess = false
	} = useTopRatedQuery({
		props: { mediaType: 'tv' },
		options: { enabled: isShowsQueryEnabled }
	});

	useTimeout(() => setIsMoviesQueryEnabled.on(), activeTabDebounced === 0 && inView ? 1000 : null);
	useTimeout(() => setIsShowsQueryEnabled.on(), activeTabDebounced === 1 && inView ? 1000 : null);

	return (
		<Center ref={ref} width='100%'>
			<HomeHorizontalGrid
				activeTab={activeTabDebounced}
				title='Top Rated'
				subtitle='A list containing the highest-rated Movies & TV Shows of all time.'
				to={({ mediaType }) => {
					return {
						pathname: formatMediaType({ mediaType }),
						search: qs.stringify({ sort_by: 'vote_average.desc' })
					};
				}}
				mediaTypes={['movie', 'tv']}
				data={{
					movie: movies?.results || [],
					tv: shows?.results || [],
					person: []
				}}
				isLoading={{
					movie: isFetchingMovies || isMoviesLoading,
					tv: isFetchingShows || isShowsLoading,
					person: false
				}}
				isError={{
					movie: isMoviesError,
					tv: isShowsError,
					person: false
				}}
				isSuccess={{
					movie: isMoviesSuccess,
					tv: isShowsSuccess,
					person: false
				}}
				onChange={({ index }) => setActiveTab(index)}
			/>
		</Center>
	);
};

export default TopRated;
