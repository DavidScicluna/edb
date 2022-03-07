import { ReactElement, useState, useCallback, useEffect } from 'react';
import CountUp from 'react-countup';
import { useInfiniteQuery } from 'react-query';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useMediaQuery, useBoolean, HStack, VStack, Fade, ScaleFade, Collapse } from '@chakra-ui/react';

import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import qs from 'query-string';
import { useElementSize, useUpdateEffect, useEffectOnce } from 'usehooks-ts';

import VerticalMovies from './components/Orientation/Vertical';

import axiosInstance, { handleDelay } from '../../common/scripts/axios';
import { Response } from '../../common/types';
import { PartialMovie } from '../../common/types/movie';
import Badge from '../../components/Badge';
import Button from '../../components/Clickable/Button';
import DisplayMode from '../../components/Clickable/DisplayMode';
import LoadMore from '../../components/Clickable/LoadMore';
import { handlePopulateFilters } from '../../components/Filters/common/utils';
import DisplayFilters from '../../components/Filters/Display';
import FiltersForm, { defaultValues as defaultFilterValues } from '../../components/Filters/Form';
import { Filters as FiltersFormType } from '../../components/Filters/types';
import SortBy from '../../components/SortBy';
import { movieSortBy as sortBy } from '../../components/SortBy/common/data/sort';
import { Form as SortForm } from '../../components/SortBy/types';
import Page from '../../containers/Page';

const defaultFilters = {
	'language': 'en-US', // TODO: Make this dynamic
	'ott_region': 'US', // TODO: Make this dynamic
	'certification_country': 'US', // TODO: Make this dynamic
	'primary_release_date.lte': moment().format('YYYY-MM-DD')
};

const Movies = (): ReactElement => {
	const source = axios.CancelToken.source();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams(defaultFilters);

	const [ref, { height }] = useElementSize();

	const [movies, setMovies] = useState<Response<PartialMovie[]>>();
	const [isFetchingPage, setIsFetchingPage] = useBoolean();

	const [totalActiveFilters, setTotalActiveFilters] = useState<number>(0);

	// Fetching Movies
	const moviesQuery = useInfiniteQuery(
		'movies',
		async ({ pageParam = 1 }) => {
			const { data } = await axiosInstance
				.get<Response<PartialMovie[]>>('/discover/movie', {
					params: { ...(qs.parse(searchParams.toString() || '') || {}), page: pageParam || 1 },
					cancelToken: source.token
				})
				.then((response) => handleDelay(isFetchingPage ? 0 : 2500, response));
			return data;
		},
		{
			enabled: false,
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

	const handleCheckFilters = useCallback(
		_.debounce((filters: FiltersFormType) => {
			let key: keyof FiltersFormType;
			let total = 0;

			for (key in filters) {
				if (
					key === 'dates' &&
					(!(_.isNil(filters.dates.gte) || _.isEmpty(filters.dates.gte)) ||
						!(_.isNil(filters.dates.lte) || _.isEmpty(filters.dates.lte)))
				) {
					total = total + 1;
				} else if (key !== 'dates' && !(_.isNil(filters[key]) || _.isEmpty(filters[key]))) {
					total = total + 1;
				}
			}

			setTotalActiveFilters(total);
		}, 500),
		[setTotalActiveFilters]
	);

	const handleSetFilters = (form: FiltersFormType): void => {
		const currentSearch = qs.parse(searchParams.toString() || '');
		Object.keys(currentSearch).forEach((key) => key === 'sort_by' || delete currentSearch[key]);

		const filters = _.omitBy(
			_.merge({
				...defaultFilters,
				'certification': form.certifications.length > 0 ? form.certifications.join('|') : undefined,
				// 'include_adult': form.adult ? String(form.adult) : undefined,
				'primary_release_date.gte': form.dates.gte || undefined,
				'primary_release_date.lte': form.dates.lte || undefined,
				'with_genres': form.genres.length > 0 ? form.genres.join(',') : undefined,
				'vote_average.gte': form.rating.length > 0 && form.rating[0] ? form.rating[0] : undefined,
				'vote_average.lte': form.rating.length > 0 && form.rating[1] ? form.rating[1] : undefined,
				'vote_count.gte': form.count.length > 0 && form.count[0] ? form.count[0] : undefined,
				'vote_count.lte': form.count.length > 0 && form.count[1] ? form.count[1] : undefined,
				'with_runtime.gte': form.runtime.length > 0 && form.runtime[0] ? form.runtime[0] : undefined,
				'with_runtime.lte': form.runtime.length > 0 && form.runtime[1] ? form.runtime[1] : undefined
			}),
			_.isNil || _.isEmpty
		);

		setSearchParams(_.mergeWith({ ...currentSearch, ...filters }));

		setTimeout(() => moviesQuery.refetch(), 250);
	};

	const handleSetSortBy = (form: SortForm): void => {
		const currentSearch = _.omit(qs.parse(searchParams.toString() || ''), 'sort_by');

		const sortBy = {
			sort_by: `${form.sortBy.value}.${form.direction}`
		};

		setSearchParams(_.mergeWith({ ...currentSearch, ...sortBy }));

		setTimeout(() => moviesQuery.refetch(), 250);
	};

	const handleLoadMore = (): void => {
		const page = movies?.page || 1;
		const currentSearch = qs.parse(searchParams.toString() || '');

		setSearchParams(_.mergeWith({ ...currentSearch, page: page + 1 }));

		setIsFetchingPage.on();

		setTimeout(() => moviesQuery.fetchNextPage(), 250);
	};

	useEffect(() => {
		handleCheckFilters(handlePopulateFilters(location.search, 'movie'));
	}, [location.search]);

	useUpdateEffect(() => {
		const currentSearch = qs.parse(location.search);
		const totalPages =
			currentSearch && currentSearch.page && typeof currentSearch.page === 'string'
				? Number(currentSearch.page)
				: 1;
		const page = movies?.page || 1;

		if (page < totalPages && moviesQuery.hasNextPage) {
			setIsFetchingPage.on();

			moviesQuery.fetchNextPage();
		}
	}, [movies?.page]);

	useEffectOnce(() => {
		const currentSearch = qs.parse(location.search);

		setSearchParams(
			Object.keys(currentSearch).length > 0
				? _.merge({ ...defaultFilters, ...currentSearch })
				: _.merge({ ...defaultFilters, sort_by: 'popularity.desc' })
		);

		setTimeout(() => moviesQuery.refetch(), 250);
	});

	useEffect(() => {
		return () => source.cancel();
	}, []);

	return (
		<Page title='Movies'>
			{{
				actions: (
					<HStack width={isSm ? '100%' : 'auto'} spacing={2}>
						<SortBy
							renderButton={({ color, onClick }) => (
								<Button
									color={color}
									isFullWidth={isSm}
									isDisabled={moviesQuery.isFetching || moviesQuery.isLoading || moviesQuery.isError}
									onClick={onClick}
									variant='outlined'
									sx={{ back: { height: `${height}px` } }}
								>
									Sort By
								</Button>
							)}
							sortBy={[...sortBy]}
							onSort={handleSetSortBy}
						/>
						<FiltersForm
							renderButton={({ color, onClick }) => (
								<Button
									color={color}
									renderRight={
										totalActiveFilters > 0
											? ({ color }) => (
													<Fade in unmountOnExit>
														<Badge color={color} size='xs'>
															<CountUp duration={1} end={totalActiveFilters} />
														</Badge>
													</Fade>
											  )
											: undefined
									}
									isFullWidth={isSm}
									isDisabled={moviesQuery.isFetching || moviesQuery.isLoading || moviesQuery.isError}
									onClick={onClick}
									variant='outlined'
									sx={{ back: { height: `${height}px` } }}
								>
									Filter
								</Button>
							)}
							mediaType='movie'
							onFilter={handleSetFilters}
						/>
						<DisplayMode ref={ref} />
					</HStack>
				),
				body: (
					<VStack width='100%' spacing={4} px={2} pt={2}>
						<VStack width='100%' spacing={2}>
							<Collapse in={totalActiveFilters > 0} unmountOnExit style={{ width: '100%' }}>
								<DisplayFilters
									mediaType='movie'
									onTagDelete={(filter, filters) =>
										handleSetFilters({ ...filters, [filter]: defaultFilterValues[filter] })
									}
									onClear={() => handleSetFilters({ ...defaultFilterValues })}
								/>
							</Collapse>

							<VerticalMovies
								isError={moviesQuery.isError}
								isSuccess={moviesQuery.isSuccess}
								isLoading={moviesQuery.isFetching || moviesQuery.isLoading}
								movies={movies?.results || []}
							/>
						</VStack>

						<ScaleFade
							in={!moviesQuery.isError && (movies?.total_results || 0) > 0}
							unmountOnExit
							style={{ width: isSm ? '100%' : 'auto' }}
						>
							<LoadMore
								amount={movies?.results?.length || 0}
								total={movies?.total_results || 0}
								label='Movies'
								isLoading={moviesQuery.isFetching || moviesQuery.isLoading}
								isButtonVisible={(moviesQuery.hasNextPage || true) && !moviesQuery.isError}
								onClick={handleLoadMore}
							/>
						</ScaleFade>
					</VStack>
				)
			}}
		</Page>
	);
};

export default Movies;
