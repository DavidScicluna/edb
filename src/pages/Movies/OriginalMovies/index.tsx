import { FC, useState, lazy } from 'react';

import { useNavigate } from 'react-router';

import { Undefinable, useTheme, useDebounce, Divider } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, HStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { isEmpty, isNil, merge, omit, omitBy, pick, uniqBy } from 'lodash';
import dayjs from 'dayjs';
import qs from 'query-string';

import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import PageHeader from '../../../containers/Page/components/PageHeader';
import { formatMediaTypeLabel } from '../../../common/utils';
import { DisplayMode, Suspense } from '../../../components';
import { useMediaTypeInfiniteQuery } from '../../../common/queries';
import { PartialMovie } from '../../../common/types/movie';
import { UseMediaTypeInfiniteQueryResponse } from '../../../common/queries/useMediaTypeInfiniteQuery';
import VerticalDummyMovies from '../components/VerticalDummyMovies';
import { SortByForm } from '../../../components/SortBy/types';
import { FiltersForm } from '../../../components/Filters/types';
import { data as dataFormat } from '../../../components/Filters/common/data/formats';
import defaultFiltersFormValues from '../../../components/Filters/common/data/defaults';
import sortByDefaultValues from '../../../components/SortBy/common/data/defaults';
import { useUserTheme } from '../../../common/hooks';
import { getTotalFilters } from '../../../components/Filters/common/utils';

import MoviesSortBy from './components/MoviesSortBy';
import MoviesFiltersForm from './components/MoviesFiltersForm';
import MoviesDisplayFilters from './components/MoviesDisplayFilters';

const VerticalMovies = lazy(() => import('../components/VerticalMovies'));

const timeout = 500;

const defaultPagination = { page: 1 };

const defaultSortBy = { sort_by: `${sortByDefaultValues.sortBy.value}.${sortByDefaultValues.direction}` };

const defaultFilters = {
	'language': 'en-US', // TODO: Make this dynamic
	'ott_region': 'US', // TODO: Make this dynamic
	'certification_country': 'US', // TODO: Make this dynamic
	'primary_release_date.lte': dayjs(new Date()).format(dataFormat)
};

const OriginalMovies: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	const { spacing } = useLayoutContext();

	const navigate = useNavigate();

	const [movies, setMovies] = useState<UseMediaTypeInfiniteQueryResponse<'movie'>>();
	const moviesDebounced = useDebounce<Undefinable<UseMediaTypeInfiniteQueryResponse<'movie'>>>(movies, 'slow');

	const [totalFilters, setTotalFilters] = useState<number>(getTotalFilters({ location, mediaType: 'movie' }) || 0);
	const totalFiltersDebounced = useDebounce<number>(totalFilters);

	const moviesInfiniteQuery = useMediaTypeInfiniteQuery<'movie'>({
		props: { mediaType: 'movie' },
		config: { params: { ...qs.parse(location.search) } },
		options: {
			enabled: false,
			onSuccess: (data) => {
				let movies: PartialMovie[] = [];

				data.pages.forEach((page) => {
					movies = [...movies, ...(page?.results || [])];
				});

				setMovies({
					page: data.pages[data.pages.length - 1].page || 1,
					results: uniqBy([...movies], 'id'),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	});

	const { isFetchingNextPage, isFetching, isLoading, isError, refetch, fetchNextPage } = moviesInfiniteQuery;

	const handleFetch = (params: Record<string, string | number>): void => {
		setMovies(undefined);

		navigate({ pathname: '.', search: qs.stringify({ ...params }) });

		setTimeout(() => refetch(), timeout);
	};

	const handleLoadMore = (): void => {
		const currentParams = omit({ ...qs.parse(location.search) }, 'page');
		const updatedParams = merge({ ...currentParams, page: (movies?.page || 1) + 1 });

		navigate({ pathname: '.', search: qs.stringify({ ...updatedParams }) });

		setTimeout(() => fetchNextPage(), timeout);
	};

	const handleSetSortBy = ({ sortBy, direction }: SortByForm): void => {
		const currentParams = omit({ ...qs.parse(location.search) }, 'sort_by');
		const updatedSortBy = { sort_by: `${sortBy.value}.${direction}` };

		handleFetch(merge({ ...currentParams, ...updatedSortBy }));
	};

	const handleSetFilters = ({ certifications, dates, genres, rating, count, runtime }: FiltersForm): void => {
		const currentParams = pick({ ...qs.parse(location.search) }, 'sort_by');
		const updatedFilters = omitBy(
			merge({
				...defaultFilters,
				'certification': certifications.length > 0 ? certifications.join('|') : undefined,
				'primary_release_date.gte': dates.gte || undefined,
				'primary_release_date.lte': dates.lte || undefined,
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

		handleFetch(merge({ ...currentParams, ...updatedFilters }));
	};

	useUpdateEffect(() => setTotalFilters(getTotalFilters({ location, mediaType: 'movie' }) || 0), [location.search]);

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
					<Text {...props}>{formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}</Text>
				)}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`A list containing all the ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'movie'
						})} that have been released or will be in the coming months.`}
					</Text>
				)}
				actions={
					<HStack width={isLg ? '100%' : 'auto'} spacing={2}>
						<MoviesSortBy
							isDisabled={isFetchingNextPage || isFetching || isLoading || isError}
							onSort={handleSetSortBy}
						/>
						<MoviesFiltersForm
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
					<MoviesDisplayFilters
						total={totalFiltersDebounced}
						onTagDelete={({ filter, form }) =>
							handleSetFilters({ ...form, [filter]: defaultFiltersFormValues[filter] })
						}
						onClear={(form) => handleSetFilters({ ...form })}
					/>
					<Suspense fallback={<VerticalDummyMovies />}>
						<VerticalMovies
							query={moviesInfiniteQuery}
							movies={moviesDebounced}
							onLoadMore={handleLoadMore}
						/>
					</Suspense>
				</VStack>
			</PageBody>
		</Page>
	);
};

export default OriginalMovies;
