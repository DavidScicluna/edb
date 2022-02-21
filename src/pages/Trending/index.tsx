import { ReactElement, useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { VStack, Center, Fade } from '@chakra-ui/react';

import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';

import Header from './components/Header';
import MediaTypesPicker from './components/MediaTypesPicker';
import Movies from './components/Movies';
import People from './components/People';
import TV from './components/TV';

import axiosInstance from '../../common/scripts/axios';
import { Response } from '../../common/types';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import Divider from '../../components/Divider';
import Tabs from '../../components/Tabs';
import TabPanels from '../../components/Tabs/components/TabPanels';
import Page from '../../containers/Page';

const Trending = (): ReactElement => {
	const source = axios.CancelToken.source();

	const location = useLocation();

	const [activeTab, setActiveTab] = useState<number>();

	const [movies, setMovies] = useState<Response<PartialMovie[]>>();
	const [shows, setShows] = useState<Response<PartialTV[]>>();
	const [people, setPeople] = useState<Response<PartialPerson[]>>();

	// Fetching trending movies
	const trendingMoviesQuery = useInfiniteQuery(
		'trending-movies',
		async ({ pageParam = 1 }) => {
			const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/trending/movie/day', {
				params: { page: pageParam },
				cancelToken: source.token
			});
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
					results: [..._.uniqBy(movies, 'id')],
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
			const { data } = await axiosInstance.get<Response<PartialTV[]>>('/trending/tv/day', {
				params: { page: pageParam },
				cancelToken: source.token
			});
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
					results: [..._.uniqBy(tvShows, 'id')],
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
			const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/trending/person/week', {
				params: { page: pageParam },
				cancelToken: source.token
			});
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
					results: [..._.uniqBy(people, 'id')],
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	);

	const handleCheckLocation = (): void => {
		const hash = String(location.hash).replace('#', '');

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

	useEffect(() => {
		handleCheckLocation();
	}, [location]);

	useEffect(() => {
		handleCheckLocation();

		return () => {
			source.cancel();

			setActiveTab(undefined);
		};
	}, []);

	return (
		<Page title='Trending'>
			{{
				body: (
					<Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
						<VStack width='100%' divider={<Divider orientation='horizontal' />} spacing={2} p={2}>
							<Header activeTab={activeTab} />

							<AnimatePresence exitBeforeEnter initial={false}>
								{_.isNil(activeTab) ? (
									<Center as={Fade} key='media-types-picker' width='100%' in unmountOnExit>
										<MediaTypesPicker onSelected={(index: number) => setActiveTab(index)} />
									</Center>
								) : (
									<Center as={Fade} key='list-tab-panels' width='100%' in unmountOnExit>
										<TabPanels>
											<Movies movies={movies} query={trendingMoviesQuery} />
											<TV shows={shows} query={trendingTVQuery} />
											<People people={people} query={trendingPeopleQuery} />
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