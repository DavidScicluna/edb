import { FC, useState, lazy } from 'react';

import { useNavigate } from 'react-router';

import { Undefinable, useTheme, useDebounce, Divider } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, HStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import qs from 'query-string';
import { isEmpty, isNil, merge, omit, omitBy, pick, uniqBy } from 'lodash';
import dayjs from 'dayjs';

import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import PageHeader from '../../../containers/Page/components/PageHeader';
import { formatMediaTypeLabel } from '../../../common/utils';
import { DisplayMode, Suspense } from '../../../components';
import { useMediaTypeInfiniteQuery } from '../../../common/queries';
import VerticalDummyTVShows from '../components/VerticalDummyTVShows';
import { SortByForm } from '../../../components/SortBy/types';
import { FiltersForm } from '../../../components/Filters/types';
import defaultFiltersFormValues from '../../../components/Filters/common/data/defaults';
import sortByDefaultValues from '../../../components/SortBy/common/data/defaults';
import { useUserTheme } from '../../../common/hooks';
import { getGenres, getTotalFilters } from '../../../components/Filters/common/utils';
import { PartialTVShow } from '../../../common/types/tv';
import { UseMediaTypeInfiniteQueryResponse } from '../../../common/queries/useMediaTypeInfiniteQuery';
import { data as dataFormat } from '../../../components/Filters/common/data/formats';

import TVShowsSortBy from './components/TVShowsSortBy';
import TVShowsFiltersForm from './components/TVShowsFiltersForm';
import TVShowsDisplayFilters from './components/TVShowsDisplayFilters';

const VerticalTVShows = lazy(() => import('../components/VerticalTVShows'));

const timeout = 500;

const defaultPagination = { page: 1 };

const defaultSortBy = { sort_by: `${sortByDefaultValues.sortBy.value}.${sortByDefaultValues.direction}` };

const defaultFilters = {
	'language': 'en-US', // TODO: Make this dynamic
	'ott_region': 'US', // TODO: Make this dynamic
	'certification_country': 'US', // TODO: Make this dynamic
	'first_air_date.lte': dayjs(new Date()).format(dataFormat) // TODO: Make a date format util to have a single point of reference
};

const OriginalTVShows: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	const { spacing } = useLayoutContext();

	const navigate = useNavigate();

	const [shows, setShows] = useState<UseMediaTypeInfiniteQueryResponse<'tv'>>();
	const showsDebounced = useDebounce<Undefinable<UseMediaTypeInfiniteQueryResponse<'tv'>>>(shows, 'slow');

	const [totalFilters, setTotalFilters] = useState<number>(getTotalFilters({ location, mediaType: 'tv' }) || 0);
	const totalFiltersDebounced = useDebounce<number>(totalFilters);

	const tvShowsInfiniteQuery = useMediaTypeInfiniteQuery<'tv'>({
		props: { mediaType: 'tv' },
		config: { params: { ...qs.parse(location.search) } },
		options: {
			enabled: false,
			onSuccess: (data) => {
				let shows: PartialTVShow[] = [];

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

	const { isFetchingNextPage, isFetching, isLoading, isError, refetch, fetchNextPage } = tvShowsInfiniteQuery;

	const handleFetch = (params: Record<string, string | number>): void => {
		setShows(undefined);

		navigate({ pathname: '.', search: qs.stringify({ ...params }) });

		setTimeout(refetch, timeout);
	};

	const handleLoadMore = (): void => {
		const currentParams = omit({ ...qs.parse(location.search) }, 'page');
		const updatedParams = merge({ ...currentParams, page: (shows?.page || 1) + 1 });

		navigate({ pathname: '.', search: qs.stringify({ ...updatedParams }) });

		setTimeout(() => fetchNextPage(), timeout);
	};

	const handleSetSortBy = ({ sortBy, direction }: SortByForm): void => {
		const currentParams = omit({ ...qs.parse(location.search) }, 'sort_by');
		const updatedSortBy = { sort_by: `${sortBy.value}.${direction}` };

		handleFetch(merge({ ...currentParams, ...updatedSortBy }));
	};

	const handleSetFilters = (values: FiltersForm): void => {
		const { certifications, dates, genres, keywords, rating, count, runtime } = values;

		const currentParams = pick({ ...qs.parse(location.search) }, 'sort_by');
		const updatedFilters = omitBy(
			merge({
				...defaultFilters,
				'certification': certifications.length > 0 ? certifications.join('|') : undefined,
				'first_air_date.gte': dates.gte || undefined,
				'first_air_date.lte': dates.lte || undefined,
				'without_genres': genres.length > 0 ? getGenres({ mediaType: 'tv', genres }).join(',') : undefined,
				'with_keywords': keywords.length > 0 ? keywords.join(',') : undefined,
				'vote_average.gte': rating.length > 0 && rating[0] ? rating[0] : undefined,
				'vote_average.lte': rating.length > 0 && rating[1] ? rating[1] : undefined,
				'vote_count.gte': count.length > 0 && count[0] ? count[0] : undefined,
				'vote_count.lte': count.length > 0 && count[1] ? count[1] : undefined,
				'with_runtime.gte': runtime.length > 0 && runtime[0] ? runtime[0] : undefined,
				'with_runtime.lte': runtime.length > 0 && runtime[1] ? runtime[1] : undefined
			}),
			isNil || isEmpty
		);

		handleFetch(merge({ ...currentParams, ...updatedFilters }));
	};

	useUpdateEffect(() => setTotalFilters(getTotalFilters({ location, mediaType: 'tv' }) || 0), [location.search]);

	useEffectOnce(() => {
		const params = qs.parse(location.search);
		const updatedParams =
			location.search.length > 0
				? { ...defaultPagination, ...defaultSortBy, ...defaultFilters, ...params }
				: { ...defaultPagination, ...defaultSortBy, ...defaultFilters };

		handleFetch(merge({ ...updatedParams }));
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
				spacing={spacing}
				px={spacing}
				py={spacing * 2}
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
						<VerticalTVShows
							query={tvShowsInfiniteQuery}
							shows={showsDebounced}
							onLoadMore={handleLoadMore}
						/>
					</Suspense>
				</VStack>
			</PageBody>
		</Page>
	);
};

export default OriginalTVShows;
