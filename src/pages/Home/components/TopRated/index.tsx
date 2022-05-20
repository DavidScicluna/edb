import { ReactElement, useState, useEffect } from 'react';

import { useInView } from 'react-cool-inview';
import { useQuery } from 'react-query';
import axios from 'axios';
import qs from 'query-string';

import axiosInstance, { handleDelay } from '../../../../common/scripts/axios';
import { Response } from '../../../../common/types';
import { PartialMovie } from '../../../../common/types/movie';
import { PartialTV } from '../../../../common/types/tv';
import HomeHorizontalGrid from '../HorizontalGrid';

const TopRated = (): ReactElement => {
	const source = axios.CancelToken.source();

	const { observe: ref, inView } = useInView<HTMLDivElement>({
		threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const [activeTab, setActiveTab] = useState<number>(0);

	// Fetching Top Rated Movies
	const topRatedMoviesQuery = useQuery(
		'top-rated-movies',
		async () => {
			const { data } = await axiosInstance
				.get<Response<PartialMovie[]>>('/movie/top_rated', {
					cancelToken: source.token
				})
				.then((response) => handleDelay(2500, response));
			return data;
		},
		{ enabled: activeTab === 0 && inView }
	);

	// Fetching Top Rated TV Shows
	const topRatedTVQuery = useQuery(
		'top-rated-tv-shows',
		async () => {
			const { data } = await axiosInstance
				.get<Response<PartialTV[]>>('/tv/top_rated', {
					cancelToken: source.token
				})
				.then((response) => handleDelay(2500, response));
			return data;
		},
		{ enabled: activeTab === 1 && inView }
	);

	useEffect(() => {
		return () => source.cancel();
	}, []);

	return (
		<HomeHorizontalGrid
			ref={ref}
			activeTab={activeTab}
			title='Top Rated'
			to={({ mediaType }) => {
				if (mediaType === 'movie') {
					return {
						pathname: '/movies',
						search: qs.stringify({ sort_by: 'vote_average.desc' })
					};
				} else {
					return {
						pathname: '/tvshows',
						search: qs.stringify({ sort_by: 'vote_average.desc' })
					};
				}
			}}
			mediaTypes={['movie', 'tv']}
			data={{
				movie: topRatedMoviesQuery.data?.results || [],
				tv: topRatedTVQuery.data?.results || []
			}}
			isLoading={{
				movie: topRatedMoviesQuery.isFetching || topRatedMoviesQuery.isLoading,
				tv: topRatedTVQuery.isFetching || topRatedTVQuery.isLoading
			}}
			isError={{
				movie: topRatedMoviesQuery.isError,
				tv: topRatedTVQuery.isError
			}}
			isSuccess={{
				movie: topRatedMoviesQuery.isSuccess,
				tv: topRatedTVQuery.isSuccess
			}}
			onTabChange={(index: number) => setActiveTab(index)}
		/>
	);
};

export default TopRated;
