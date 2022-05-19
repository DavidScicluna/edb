import { ReactElement, useState, useEffect } from 'react';


import { useBoolean, VStack, Center, Fade } from '@chakra-ui/react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import isNil from 'lodash/isNil';
import mergeWith from 'lodash/mergeWith';
import uniqBy from 'lodash/uniqBy';
import qs from 'query-string';
import { useUpdateEffect } from 'usehooks-ts';


import axiosInstance, { handleDelay } from '../../common/scripts/axios';
import { MediaType, Response } from '../../common/types';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import Divider from '../../components/Divider';
import Tabs from '../../components/Tabs';
import TabPanels from '../../components/Tabs/components/TabPanels';
import Page from '../../containers/Page';

import TV from './components/TV';
import People from './components/People';
import Movies from './components/Movies';
import MediaTypesPicker from './components/MediaTypesPicker';
import Header from './components/Header';

const allMediaTypes: MediaType[] = ['movie', 'tv', 'person', 'company', 'collection'];

const Trending = (): ReactElement => {
	const source = axios.CancelToken.source();

	const location = useLocation();
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState<number>();

	const [movies, setMovies] = useState<Response<PartialMovie[]>>();
	const [shows, setShows] = useState<Response<PartialTV[]>>();
	const [people, setPeople] = useState<Response<PartialPerson[]>>();
	const [isFetchingPage, setIsFetchingPage] = useBoolean();

	// Fetching trending movies
	const trendingMoviesQuery = useInfiniteQuery(
		'trending-movies',
		async ({ pageParam = 1 }) => {
			const { data } = await axiosInstance
				.get<Response<PartialMovie[]>>('/trending/movie/day', {
					params: { page: pageParam || 1 },
					cancelToken: source.token
				})
				.then((response) => handleDelay(isFetchingPage ? 0 : 2500, response));
			return data;
		},
		{
			enabled: activeTab === 0,
			getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
			onSuccess: (data) => {
				let movies: PartialMovie[] = [];

				data.pages.forEach((page) => {
					movies = [...movies, ...(page?.results || [])];
				});

				setMovies({
					page: data.pages[data.pages.length - 1].page,
					results: [...uniqBy(movies, 'id')],
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	);

	// Fetchingtrending tv shows
	const trendingTVQuery = useInfiniteQuery(
		'trending-tv-shows',
		async ({ pageParam = 1 }) => {
			const { data } = await axiosInstance
				.get<Response<PartialTV[]>>('/trending/tv/day', {
					params: { page: pageParam || 1 },
					cancelToken: source.token
				})
				.then((response) => handleDelay(isFetchingPage ? 0 : 2500, response));
			return data;
		},
		{
			enabled: activeTab === 1,
			getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
			onSuccess: (data) => {
				let tvShows: PartialTV[] = [];

				data.pages.forEach((page) => {
					tvShows = [...tvShows, ...(page.results || [])];
				});

				setShows({
					page: data.pages[data.pages.length - 1].page,
					results: [...uniqBy(tvShows, 'id')],
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	);

	// Fetching trending people
	const trendingPeopleQuery = useInfiniteQuery(
		'trending-people',
		async ({ pageParam = 1 }) => {
			const { data } = await axiosInstance
				.get<Response<PartialPerson[]>>('/trending/person/week', {
					params: { page: pageParam || 1 },
					cancelToken: source.token
				})
				.then((response) => handleDelay(isFetchingPage ? 0 : 2500, response));
			return data;
		},
		{
			enabled: activeTab === 2,
			getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
			onSuccess: (data) => {
				let people: PartialPerson[] = [];

				data.pages.forEach((page) => {
					people = [...people, ...(page?.results || [])];
				});

				setPeople({
					page: data.pages[data.pages.length - 1].page,
					results: [...uniqBy(people, 'id')],
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	);

	const handleLoadMore = (): void => {
		switch (activeTab) {
			case 0: {
				const page = movies?.page || 1;

				navigate({
					pathname: '.',
					hash: allMediaTypes[0],
					search: qs.stringify(mergeWith({ page: page + 1 }))
				});

				setIsFetchingPage.on();

				setTimeout(() => trendingMoviesQuery.fetchNextPage(), 250);

				break;
			}
			case 1: {
				const page = shows?.page || 1;

				navigate({
					pathname: '.',
					hash: allMediaTypes[1],
					search: qs.stringify(mergeWith({ page: page + 1 }))
				});

				setIsFetchingPage.on();

				setTimeout(() => trendingTVQuery.fetchNextPage(), 250);

				break;
			}
			case 2: {
				const page = people?.page || 1;

				navigate({
					pathname: '.',
					hash: allMediaTypes[2],
					search: qs.stringify(mergeWith({ page: page + 1 }))
				});

				setIsFetchingPage.on();

				setTimeout(() => trendingPeopleQuery.fetchNextPage(), 250);

				break;
			}
			default:
				break;
		}
	};

	const handleCheckLocation = (): void => {
		const hash = location.hash.replace('#', '');

		setIsFetchingPage.off();

		switch (hash) {
			case 'movie':
				setActiveTab(0);
				return;
			case 'tv':
				setActiveTab(1);
				return;
			case 'person':
				setActiveTab(2);
				return;
			default:
				setActiveTab(undefined);
				return;
		}
	};

	useUpdateEffect(() => {
		if (activeTab === 0) {
			const currentSearch = qs.parse(location.search);
			const totalPages =
				currentSearch && currentSearch.page && typeof currentSearch.page === 'string'
					? Number(currentSearch.page)
					: 1;
			const page = movies?.page || 1;

			if (page < totalPages && trendingMoviesQuery.hasNextPage) {
				setIsFetchingPage.on();

				trendingMoviesQuery.fetchNextPage();
			}
		}
	}, [movies?.page]);

	useUpdateEffect(() => {
		if (activeTab === 1) {
			const currentSearch = qs.parse(location.search);
			const totalPages =
				currentSearch && currentSearch.page && typeof currentSearch.page === 'string'
					? Number(currentSearch.page)
					: 1;
			const page = shows?.page || 1;

			if (page < totalPages && trendingTVQuery.hasNextPage) {
				setIsFetchingPage.on();

				trendingTVQuery.fetchNextPage();
			}
		}
	}, [shows?.page]);

	useUpdateEffect(() => {
		if (activeTab === 2) {
			const currentSearch = qs.parse(location.search);
			const totalPages =
				currentSearch && currentSearch.page && typeof currentSearch.page === 'string'
					? Number(currentSearch.page)
					: 1;
			const page = people?.page || 1;

			if (page < totalPages && trendingPeopleQuery.hasNextPage) {
				setIsFetchingPage.on();

				trendingPeopleQuery.fetchNextPage();
			}
		}
	}, [people?.page]);

	useEffect(() => {
		if (location.pathname === '/trending') {
			handleCheckLocation();
		}
	}, [location.hash]);

	useEffect(() => {
		return () => source.cancel();
	}, []);

	return (
		<Page title='Trending'>
			{{
				body: (
					<Tabs
						activeTab={activeTab}
						onChange={(index: number) => navigate({ pathname: '.', hash: allMediaTypes[index] })}
					>
						<VStack width='100%' divider={<Divider orientation='horizontal' />} spacing={2} p={2}>
							<Header activeTab={activeTab} />

							<AnimatePresence exitBeforeEnter initial={false}>
								{isNil(activeTab) ? (
									<Center as={Fade} key='media-types-picker' width='100%' in unmountOnExit>
										<MediaTypesPicker
											onSelected={(index: number) =>
												navigate({ pathname: '.', hash: allMediaTypes[index] })
											}
										/>
									</Center>
								) : (
									<Center as={Fade} key='list-tab-panels' width='100%' in unmountOnExit>
										<TabPanels>
											<Movies
												movies={movies}
												query={trendingMoviesQuery}
												onLoadMore={handleLoadMore}
											/>
											<TV shows={shows} query={trendingTVQuery} onLoadMore={handleLoadMore} />
											<People
												people={people}
												query={trendingPeopleQuery}
												onLoadMore={handleLoadMore}
											/>
										</TabPanels>
									</Center>
								)}
							</AnimatePresence>
						</VStack>
					</Tabs>
				)
			}}
		</Page>
	);
};

export default Trending;
