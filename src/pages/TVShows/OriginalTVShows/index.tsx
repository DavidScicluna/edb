import { FC, useState, lazy } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { Undefinable, useTheme, Divider } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, HStack, Text } from '@chakra-ui/react';

import { useDebounce, useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import qs from 'query-string';
import { isEmpty, isNil, merge, omit, omitBy, pick, uniqBy } from 'lodash';
import dayjs from 'dayjs';

import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import PageHeader from '../../../containers/Page/components/PageHeader';
import { formatMediaTypeLabel } from '../../../common/utils';
import { DisplayMode, Suspense } from '../../../components';
import { useTVShowsInfiniteQuery } from '../../../common/queries';
import VerticalDummyTVShows from '../components/VerticalDummyTVShows';
import { SortByForm } from '../../../components/SortBy/types';
import { FiltersForm } from '../../../components/Filters/types';
import defaultFiltersFormValues from '../../../components/Filters/common/data/defaults';
import sortByDefaultValues from '../../../components/SortBy/common/data/defaults';
import { AxiosConfigParams } from '../../../common/types';
import { useUserTheme } from '../../../common/hooks';
import { getTotalFilters } from '../../../components/Filters/common/utils';
import { PartialTV } from '../../../common/types/tv';
import { UseTVShowsInfiniteQueryResponse } from '../../../common/queries/useTVShowsInfiniteQuery';

import TVShowsSortBy from './components/TVShowsSortBy';
import TVShowsFiltersForm from './components/TVShowsFiltersForm';
import TVShowsDisplayFilters from './components/TVShowsDisplayFilters';

const VerticalTVShows = lazy(() => import('../components/VerticalTVShows'));

const defaultSortBy = {
	sort_by: `${sortByDefaultValues.sortBy.value}.${sortByDefaultValues.direction}`
};

const defaultFilters = {
	'language': 'en-US', // TODO: Make this dynamic
	'ott_region': 'US', // TODO: Make this dynamic
	'certification_country': 'US', // TODO: Make this dynamic
	'first_air_date.lte': dayjs(new Date()).format('YYYY-MM-DD') // TODO: Make a date format util to have a single point of reference
};

const OriginalTVShows: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	const { spacing } = useLayoutContext();

	const location = useLocation();
	const navigate = useNavigate();

	const [shows, setShows] = useState<UseTVShowsInfiniteQueryResponse>();
	const showsDebounced = useDebounce<Undefinable<UseTVShowsInfiniteQueryResponse>>(shows, 500);

	const [params, setParams] = useState<AxiosConfigParams>();
	const paramsDebounced = useDebounce<AxiosConfigParams>(params, 500);

	const [totalFilters, setTotalFilters] = useState<number>(getTotalFilters({ location, mediaType: 'tv' }) || 0);
	const totalFiltersDebounced = useDebounce<number>(totalFilters, 500);

	const tvShowsInfiniteQuery = useTVShowsInfiniteQuery({
		config: { params: { ...paramsDebounced } },
		options: {
			enabled: !!paramsDebounced,
			onSuccess: (data) => {
				let shows: PartialTV[] = [];

				data.pages.forEach((page) => {
					shows = [...shows, ...(page.results || [])];
				});

				setShows({
					page: data.pages[data.pages.length - 1].page,
					results: uniqBy([...shows], 'id'),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	});

	const { isFetchingNextPage, isFetching, isLoading, isError } = tvShowsInfiniteQuery;

	const handleSetSortBy = ({ sortBy, direction }: SortByForm): void => {
		const currentSearch = omit(qs.parse(location.search || ''), 'sort_by') || {};
		const updatedSortBy = { sort_by: `${sortBy.value}.${direction}` };

		const params = { ...currentSearch, ...updatedSortBy };

		setShows(undefined);
		setParams({ ...params });

		navigate({ pathname: '.', search: qs.stringify({ ...params }) });
	};

	const handleSetFilters = ({ certifications, dates, genres, rating, count, runtime }: FiltersForm): void => {
		const currentSearch = pick(qs.parse(location.search || ''), 'sort_by') || {};
		const updatedfilters = omitBy(
			merge({
				...defaultFilters,
				'certification': certifications.length > 0 ? certifications.join('|') : undefined,
				'first_air_date.gte': dates.gte || undefined,
				'first_air_date.lte': dates.lte || undefined,
				'with_genres': genres.length > 0 ? genres.join(',') : undefined,
				'vote_average.gte': rating.length > 0 && rating[0] ? rating[0] : undefined,
				'vote_average.lte': rating.length > 0 && rating[1] ? rating[1] : undefined,
				'vote_count.gte': count.length > 0 && count[0] ? count[0] : undefined,
				'vote_count.lte': count.length > 0 && count[1] ? count[1] : undefined,
				'with_runtime.gte': runtime.length > 0 && runtime[0] ? runtime[0] : undefined,
				'with_runtime.lte': runtime.length > 0 && runtime[1] ? runtime[1] : undefined
			}),
			isNil || isEmpty
		);

		const params = { ...currentSearch, ...updatedfilters };

		setShows(undefined);
		setParams({ ...params });

		navigate({ pathname: '.', search: qs.stringify({ ...params }) });
	};

	useUpdateEffect(() => setTotalFilters(getTotalFilters({ location, mediaType: 'tv' }) || 0), [location.search]);

	useEffectOnce(() => {
		const currentSearch = qs.parse(location.search);
		const params =
			currentSearch && location.search.length > 0
				? merge({ ...defaultSortBy, ...defaultFilters, ...currentSearch })
				: merge({ ...defaultSortBy, ...defaultFilters });

		setParams({ ...params });

		navigate({ pathname: '.', search: qs.stringify({ ...params }) });
	});

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => (
					<Text {...props}>{formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })}</Text>
				)}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`A list containing all the ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'tv'
						})} that have been released or will be in the coming months.`}
					</Text>
				)}
				actions={
					<HStack width={isLg ? '100%' : 'auto'} spacing={2}>
						<TVShowsSortBy
							isDisabled={isFetchingNextPage || isFetching || isLoading || isError}
							onSort={handleSetSortBy}
						/>
						<TVShowsFiltersForm
							total={totalFiltersDebounced}
							isDisabled={isFetchingNextPage || isFetching || isLoading || isError}
							onFilter={handleSetFilters}
						/>
						<DisplayMode />
					</HStack>
				}
				direction={isLg ? 'column' : 'row'}
				p={spacing}
			/>
			<PageBody p={spacing}>
				<VStack
					width='100%'
					divider={totalFiltersDebounced > 0 ? <Divider colorMode={colorMode} /> : undefined}
					spacing={spacing}
				>
					<TVShowsDisplayFilters
						total={totalFiltersDebounced}
						onTagDelete={({ filter, form }) =>
							handleSetFilters({ ...form, [filter]: defaultFiltersFormValues[filter] })
						}
						onClear={(form) => handleSetFilters({ ...form })}
					/>

					<Suspense fallback={<VerticalDummyTVShows />}>
						<VerticalTVShows query={tvShowsInfiniteQuery} shows={showsDebounced} />
					</Suspense>
				</VStack>
			</PageBody>
		</Page>
	);
};

export default OriginalTVShows;
