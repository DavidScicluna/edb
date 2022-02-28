import { ReactElement, useState, useCallback, useEffect } from 'react';
import CountUp from 'react-countup';
import { useInfiniteQuery } from 'react-query';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useMediaQuery, HStack, VStack, Fade, ScaleFade, Collapse } from '@chakra-ui/react';

import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import qs from 'query-string';
import { useElementSize } from 'usehooks-ts';

import VerticalTV from './components/Orientation/Vertical';

import axiosInstance from '../../common/scripts/axios';
import { Response } from '../../common/types';
import { PartialTV } from '../../common/types/tv';
import Badge from '../../components/Badge';
import Button from '../../components/Clickable/Button';
import DisplayMode from '../../components/Clickable/DisplayMode';
import LoadMore from '../../components/Clickable/LoadMore';
import { handlePopulateFilters } from '../../components/Filters/common/utils';
import DisplayFilters from '../../components/Filters/Display';
import FiltersForm, { defaultValues as defaultFilterValues } from '../../components/Filters/Form';
import { Filters as FiltersFormType } from '../../components/Filters/types';
import SortBy from '../../components/SortBy';
import { tvSortBy as sortBy } from '../../components/SortBy/common/data/sort';
import { Form as SortForm } from '../../components/SortBy/types';
import Page from '../../containers/Page';

const defaultFilters = {
	'language': 'en-US', // TODO: Make this dynamic
	'ott_region': 'US', // TODO: Make this dynamic
	'certification_country': 'US', // TODO: Make this dynamic
	'first_air_date.lte': moment().format('YYYY-MM-DD')
};

const TV = (): ReactElement => {
	const source = axios.CancelToken.source();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams(defaultFilters);

	const [ref, { height }] = useElementSize();

	const [shows, setShows] = useState<Response<PartialTV[]>>();

	const [totalActiveFilters, setTotalActiveFilters] = useState<number>(0);

	// Fetching TV Shows
	const tvShowsQuery = useInfiniteQuery(
		'tv-shows',
		async ({ pageParam = 1 }) => {
			const { data } = await axiosInstance.get<Response<PartialTV[]>>('/discover/tv', {
				params: { page: pageParam, ...(qs.parse(searchParams.toString() || '') || {}) },
				cancelToken: source.token
			});
			return data;
		},
		{
			enabled: false,
			getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
			onSuccess: (data) => {
				let shows: PartialTV[] = [];

				data.pages.forEach((page) => {
					shows = [...shows, ...(page?.results || [])];
				});

				setShows({
					page: data.pages[data.pages.length - 1].page,
					results: [..._.uniqBy(shows, 'id')],
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
					((!_.isNil(filters.dates.gte) && !_.isEmpty(filters.dates.gte)) ||
						(!_.isNil(filters.dates.lte) && !_.isEmpty(filters.dates.lte)))
				) {
					total = total + 1;
				} else if (key !== 'dates' && !_.isNil(filters[key]) && !_.isEmpty(filters[key])) {
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
				'first_air_date.gte': form.dates.gte || undefined,
				'first_air_date.lte': form.dates.lte || undefined,
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

		setTimeout(() => tvShowsQuery.refetch(), 250);
	};

	const handleSetSortBy = (form: SortForm): void => {
		const currentSearch = _.omit(qs.parse(searchParams.toString() || ''), 'sort_by');

		const sortBy = {
			sort_by: `${form.sortBy.value}.${form.direction}`
		};

		setSearchParams(_.mergeWith({ ...currentSearch, ...sortBy }));

		setTimeout(() => tvShowsQuery.refetch(), 250);
	};

	useEffect(() => {
		handleCheckFilters(handlePopulateFilters(location.search, 'tv'));
	}, [location.search]);

	useEffect(() => {
		const currentSearch = qs.parse(location.search);

		setSearchParams(
			Object.keys(currentSearch).length > 0
				? _.merge({ ...defaultFilters, ...currentSearch })
				: _.merge({ ...defaultFilters, sort_by: 'popularity.desc' })
		);

		setTimeout(() => tvShowsQuery.refetch(), 250);

		return () => source.cancel();
	}, []);

	return (
		<Page title='TV Shows'>
			{{
				actions: (
					<HStack width={isSm ? '100%' : 'auto'} spacing={2}>
						<SortBy
							renderButton={({ color, onClick }) => (
								<Button
									color={color}
									isFullWidth={isSm}
									isDisabled={
										tvShowsQuery.isFetching || tvShowsQuery.isLoading || tvShowsQuery.isError
									}
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
									isDisabled={
										tvShowsQuery.isFetching || tvShowsQuery.isLoading || tvShowsQuery.isError
									}
									onClick={onClick}
									variant='outlined'
									sx={{ back: { height: `${height}px` } }}
								>
									Filter
								</Button>
							)}
							mediaType='tv'
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
									mediaType='tv'
									onTagDelete={(filter, filters) =>
										handleSetFilters({ ...filters, [filter]: defaultFilterValues[filter] })
									}
									onClear={() => handleSetFilters({ ...defaultFilterValues })}
								/>
							</Collapse>

							<VerticalTV
								isError={tvShowsQuery.isError}
								isSuccess={tvShowsQuery.isSuccess}
								isLoading={tvShowsQuery.isFetching || tvShowsQuery.isLoading}
								shows={shows?.results || []}
							/>
						</VStack>

						<ScaleFade
							in={!tvShowsQuery.isError && (shows?.total_results || 0) > 0}
							unmountOnExit
							style={{ width: isSm ? '100%' : 'auto' }}
						>
							<LoadMore
								amount={shows?.results?.length || 0}
								total={shows?.total_results || 0}
								label='TV Shows'
								isLoading={tvShowsQuery.isFetching || tvShowsQuery.isLoading}
								isButtonVisible={(tvShowsQuery.hasNextPage || true) && !tvShowsQuery.isError}
								onClick={tvShowsQuery.fetchNextPage}
							/>
						</ScaleFade>
					</VStack>
				)
			}}
		</Page>
	);
};

export default TV;
