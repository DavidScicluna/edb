import { ReactElement, useState, useEffect } from 'react';

import useInView from 'react-cool-inview';
import { useQuery } from 'react-query';
import axios from 'axios';
import qs from 'query-string';

import axiosInstance, { handleDelay } from '../../../../common/scripts/axios';
import { Response } from '../../../../common/types';
import { PartialMovie } from '../../../../common/types/movie';
import { PartialTV } from '../../../../common/types/tv';
import HomeHorizontalGrid from '../HorizontalGrid';

const Popular = (): ReactElement => {
	const source = axios.CancelToken.source();

	const { observe: ref, inView } = useInView<HTMLDivElement>({
		threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const [activeTab, setActiveTab] = useState<number>(0);

	// Fetching Popular Movies
	const popularMoviesQuery = useQuery(
		'popular-movies',
		async () => {
			const { data } = await axiosInstance
				.get<Response<PartialMovie[]>>('/movie/popular', {
					cancelToken: source.token
				})
				.then((response) => handleDelay(2500, response));
			return data;
		},
		{ enabled: activeTab === 0 && inView }
	);

	// Fetching Popular TV Shows
	const popularTVQuery = useQuery(
		'popular-tv-shows',
		async () => {
			const { data } = await axiosInstance
				.get<Response<PartialTV[]>>('/tv/popular', {
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
			title='Popular'
			to={({ mediaType }) => {
				if (mediaType === 'movie') {
					return {
						pathname: '/movies',
						search: qs.stringify({ sort_by: 'popularity.desc' })
					};
				} else {
					return {
						pathname: '/tvshows',
						search: qs.stringify({ sort_by: 'popularity.desc' })
					};
				}
			}}
			mediaTypes={['movie', 'tv']}
			data={{
				movie: popularMoviesQuery.data?.results || [],
				tv: popularTVQuery.data?.results || []
			}}
			isLoading={{
				movie: popularMoviesQuery.isFetching || popularMoviesQuery.isLoading,
				tv: popularTVQuery.isFetching || popularTVQuery.isLoading
			}}
			isError={{
				movie: popularMoviesQuery.isError,
				tv: popularTVQuery.isError
			}}
			isSuccess={{
				movie: popularMoviesQuery.isSuccess,
				tv: popularTVQuery.isSuccess
			}}
			onTabChange={(index: number) => setActiveTab(index)}
		/>
	);
};

export default Popular;
