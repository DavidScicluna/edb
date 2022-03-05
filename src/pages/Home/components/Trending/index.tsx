import { ReactElement, useState, useEffect } from 'react';
import useInView from 'react-cool-inview';
import { useQuery } from 'react-query';

import axios from 'axios';

import axiosInstance, { handleDelay } from '../../../../common/scripts/axios';
import { Response } from '../../../../common/types';
import { PartialMovie } from '../../../../common/types/movie';
import { PartialPerson } from '../../../../common/types/person';
import { PartialTV } from '../../../../common/types/tv';
import HomeHorizontalGrid from '../HorizontalGrid';

const Trending = (): ReactElement => {
	const source = axios.CancelToken.source();

	const { observe: ref, inView } = useInView<HTMLDivElement>({
		threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const [activeTab, setActiveTab] = useState<number>(0);

	// Fetching Trending Movies
	const trendingMoviesQuery = useQuery(
		'trending-movies',
		async () => {
			const { data } = await axiosInstance
				.get<Response<PartialMovie[]>>('/trending/movie/day', {
					cancelToken: source.token
				})
				.then((response) => handleDelay(2000, response));
			return data;
		},
		{ enabled: activeTab === 0 && inView }
	);

	// Fetching Trending TV Shows
	const trendingTVQuery = useQuery(
		'trending-tv-shows',
		async () => {
			const { data } = await axiosInstance
				.get<Response<PartialTV[]>>('/trending/tv/day', {
					cancelToken: source.token
				})
				.then((response) => handleDelay(2000, response));
			return data;
		},
		{ enabled: activeTab === 1 && inView }
	);

	// Fetching Trending People
	const trendingPeopleQuery = useQuery(
		'trending-people',
		async () => {
			const { data } = await axiosInstance
				.get<Response<PartialPerson[]>>('/trending/person/day', {
					cancelToken: source.token
				})
				.then((response) => handleDelay(2000, response));
			return data;
		},
		{ enabled: activeTab === 2 && inView }
	);

	useEffect(() => {
		return () => source.cancel();
	}, []);

	return (
		<HomeHorizontalGrid
			ref={ref}
			activeTab={activeTab}
			title='Trending'
			to={({ mediaType }) => {
				return { pathname: '/trending', hash: mediaType };
			}}
			mediaTypes={['movie', 'tv', 'person']}
			data={{
				movie: trendingMoviesQuery.data?.results || [],
				tv: trendingTVQuery.data?.results || [],
				person: trendingPeopleQuery.data?.results || []
			}}
			isLoading={{
				movie: trendingMoviesQuery.isFetching || trendingMoviesQuery.isLoading,
				tv: trendingTVQuery.isFetching || trendingTVQuery.isLoading,
				person: trendingPeopleQuery.isFetching || trendingPeopleQuery.isLoading
			}}
			isError={{
				movie: trendingMoviesQuery.isError,
				tv: trendingTVQuery.isError,
				person: trendingPeopleQuery.isError
			}}
			isSuccess={{
				movie: trendingMoviesQuery.isSuccess,
				tv: trendingTVQuery.isSuccess,
				person: trendingPeopleQuery.isSuccess
			}}
			onTabChange={(index: number) => setActiveTab(index)}
		/>
	);
};

export default Trending;
