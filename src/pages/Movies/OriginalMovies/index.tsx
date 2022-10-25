import { FC, useState, useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { Undefinable, useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, HStack, Text } from '@chakra-ui/react';

import { useDebounce, useEffectOnce } from 'usehooks-ts';
import qs from 'query-string';
import { isEmpty, isNil, merge, omit, omitBy, pick, uniqBy } from 'lodash';
import dayjs from 'dayjs';

import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import PageHeader from '../../../containers/Page/components/PageHeader';
import { formatMediaTypeLabel } from '../../../common/utils';
import { DisplayMode, Suspense } from '../../../components';
import { useMoviesInfiniteQuery } from '../../../common/queries';
import { PartialMovie } from '../../../common/types/movie';
import { UseMoviesInfiniteQueryResponse } from '../../../common/queries/useMoviesInfiniteQuery';
import VerticalDummyMovies from '../components/VerticalDummyMovies';
import VerticalMovies from '../components/VerticalMovies';
import { SortByForm } from '../../../components/SortBy/types';
import { FiltersForm } from '../../../components/Filters/types';
import sortByDefaultValues from '../../../components/SortBy/common/data/defaults';
import { AxiosConfigParams } from '../../../common/types';

import MoviesSortBy from './components/MoviesSortBy';
import MoviesFiltersForm from './components/MoviesFiltersForm';

const defaultSortBy = {
	sort_by: `${sortByDefaultValues.sortBy.value}.${sortByDefaultValues.direction}`
};

const defaultFilters = {
	'language': 'en-US', // TODO: Make this dynamic
	'ott_region': 'US', // TODO: Make this dynamic
	'certification_country': 'US', // TODO: Make this dynamic
	'primary_release_date.lte': dayjs().format('YYYY-MM-DD')
};

const OriginalMovies: FC = () => {
	const theme = useTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	const { spacing } = useLayoutContext();

	const location = useLocation();
	const navigate = useNavigate();

	const [movies, setMovies] = useState<UseMoviesInfiniteQueryResponse>();
	const moviesDebounced = useDebounce<Undefinable<UseMoviesInfiniteQueryResponse>>(movies, 500);

	const [params, setParams] = useState<AxiosConfigParams>();
	const paramsDebounced = useDebounce<AxiosConfigParams>(params, 500);

	const moviesInfiniteQuery = useMoviesInfiniteQuery({
		config: { params: { ...paramsDebounced } },
		options: {
			enabled: !!paramsDebounced,
			onSuccess: (data) => {
				let movies: PartialMovie[] = [];

				data.pages.forEach((page) => {
					movies = [...movies, ...(page?.results || [])];
				});

				setMovies({
					page: data.pages[data.pages.length - 1].page,
					results: uniqBy([...movies], 'id'),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	});

	const { isFetchingNextPage, isFetching, isLoading, isError } = moviesInfiniteQuery;

	const handleSetSortBy = useCallback(
		({ sortBy, direction }: SortByForm): void => {
			const currentSearch = omit(qs.parse(location.search || ''), 'sort_by') || {};
			const updatedSortBy = { sort_by: `${sortBy.value}.${direction}` };

			const params = { ...currentSearch, ...updatedSortBy };

			setMovies(undefined);
			setParams({ ...params });

			navigate({ pathname: '.', search: qs.stringify({ ...params }) });
		},
		[location]
	);

	const handleSetFilters = useCallback(
		({ certifications, dates, genres, rating, count, runtime }: FiltersForm): void => {
			const currentSearch = pick(qs.parse(location.search || ''), 'sort_by') || {};
			const updatedfilters = omitBy(
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

			const params = { ...currentSearch, ...updatedfilters };

			setMovies(undefined);
			setParams({ ...params });

			navigate({ pathname: '.', search: qs.stringify({ ...params }) });
		},
		[location, defaultFilters]
	);

	// useUpdateEffect(() => {
	// 	handleCheckFilters(handlePopulateFilters(location.search, 'movie'));
	// }, [location.search]);

	useEffectOnce(() => {
		const currentSearch = qs.parse(location.search);
		const params = currentSearch
			? merge({ ...defaultSortBy, ...defaultFilters, ...currentSearch })
			: merge({ ...defaultSortBy, ...defaultFilters });

		setParams({ ...params });

		navigate({ pathname: '.', search: qs.stringify({ ...params }) });
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
				<Suspense fallback={<VerticalDummyMovies />}>
					<VerticalMovies query={moviesInfiniteQuery} movies={moviesDebounced} />
				</Suspense>
			</PageBody>
		</Page>
	);
};

export default OriginalMovies;