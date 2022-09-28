import { FC, useState } from 'react';

import { useBoolean, Center } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';
import qs from 'query-string';
import { useDebounce, useTimeout } from 'usehooks-ts';

import { usePopularQuery } from '../../../../../common/queries';
import HomeHorizontalGrid from '../HomeHorizontalGrid';
import { formatMediaType } from '../../../../../common/utils';

const Popular: FC = () => {
	const { observe: ref, inView } = useInView<HTMLDivElement>({
		threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab, 250);

	const [isMoviesQueryEnabled, setIsMoviesQueryEnabled] = useBoolean();
	const [isShowsQueryEnabled, setIsShowsQueryEnabled] = useBoolean();

	// Fetching Popular Movies
	const {
		data: movies,
		isFetching: isFetchingMovies = false,
		isLoading: isMoviesLoading = false,
		isError: isMoviesError = false,
		isSuccess: isMoviesSuccess = false
	} = usePopularQuery({
		props: { mediaType: 'movie' },
		options: { enabled: isMoviesQueryEnabled }
	});

	// Fetching Popular TV Shows
	const {
		data: shows,
		isFetching: isFetchingShows = false,
		isLoading: isShowsLoading = false,
		isError: isShowsError = false,
		isSuccess: isShowsSuccess = false
	} = usePopularQuery({
		props: { mediaType: 'tv' },
		options: { enabled: isShowsQueryEnabled }
	});

	useTimeout(() => setIsMoviesQueryEnabled.on(), activeTabDebounced === 0 && inView ? 1000 : null);
	useTimeout(() => setIsShowsQueryEnabled.on(), activeTabDebounced === 1 && inView ? 1000 : null);

	return (
		<Center ref={ref} width='100%'>
			<HomeHorizontalGrid
				activeTab={activeTabDebounced}
				title='Popular'
				subtitle='A list containing the most popular Movies & TV Shows at the moment.'
				to={({ mediaType }) => {
					return {
						pathname: formatMediaType({ mediaType }),
						search: qs.stringify({ sort_by: 'popularity.desc' })
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

export default Popular;
