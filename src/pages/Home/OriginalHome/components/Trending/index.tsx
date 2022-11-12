import { FC, useState } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import { useBoolean, Center } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';
import { useTimeout } from 'usehooks-ts';

import { useTrendingQuery } from '../../../../../common/queries';
import HomeHorizontalGrid from '../HomeHorizontalGrid';
import { formatMediaType } from '../../../../../common/utils';

const Trending: FC = () => {
	const { observe: ref, inView } = useInView<HTMLDivElement>({
		threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const [isMoviesQueryEnabled, setIsMoviesQueryEnabled] = useBoolean();
	const [isShowsQueryEnabled, setIsShowsQueryEnabled] = useBoolean();
	const [isPeopleQueryEnabled, setIsPeopleQueryEnabled] = useBoolean();

	// Fetching Trending Movies
	const {
		data: movies,
		isFetching: isFetchingMovies = false,
		isLoading: isMoviesLoading = false,
		isError: isMoviesError = false,
		isSuccess: isMoviesSuccess = false
	} = useTrendingQuery<'movie'>({
		props: { mediaType: 'movie', time: 'week' },
		options: { enabled: isMoviesQueryEnabled }
	});

	// Fetching Trending TV Shows
	const {
		data: shows,
		isFetching: isFetchingShows = false,
		isLoading: isShowsLoading = false,
		isError: isShowsError = false,
		isSuccess: isShowsSuccess = false
	} = useTrendingQuery<'tv'>({
		props: { mediaType: 'tv', time: 'week' },
		options: { enabled: isShowsQueryEnabled }
	});

	// Fetching Trending People
	const {
		data: people,
		isFetching: isFetchingPeople = false,
		isLoading: isPeopleLoading = false,
		isError: isPeopleError = false,
		isSuccess: isPeopleSuccess = false
	} = useTrendingQuery<'person'>({
		props: { mediaType: 'person', time: 'week' },
		options: { enabled: isPeopleQueryEnabled }
	});

	useTimeout(() => setIsMoviesQueryEnabled.on(), activeTabDebounced === 0 && inView ? 1000 : null);
	useTimeout(() => setIsShowsQueryEnabled.on(), activeTabDebounced === 1 && inView ? 1000 : null);
	useTimeout(() => setIsPeopleQueryEnabled.on(), activeTabDebounced === 2 && inView ? 1000 : null);

	return (
		<Center ref={ref} width='100%'>
			<HomeHorizontalGrid
				activeTab={activeTabDebounced}
				title='Trending'
				subtitle='A list containing the most trending Movies, TV Shows & People at the moment.'
				to={({ mediaType }) => {
					return { pathname: '/trending', hash: formatMediaType({ mediaType }) };
				}}
				mediaTypes={['movie', 'tv', 'person']}
				data={{
					movie: movies?.results || [],
					tv: shows?.results || [],
					person: people?.results || []
				}}
				isLoading={{
					movie: isFetchingMovies || isMoviesLoading,
					tv: isFetchingShows || isShowsLoading,
					person: isFetchingPeople || isPeopleLoading
				}}
				isError={{
					movie: isMoviesError,
					tv: isShowsError,
					person: isPeopleError
				}}
				isSuccess={{
					movie: isMoviesSuccess,
					tv: isShowsSuccess,
					person: isPeopleSuccess
				}}
				onChange={({ index }) => setActiveTab(index)}
			/>
		</Center>
	);
};

export default Trending;
