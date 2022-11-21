import { QueryKey } from '@tanstack/react-query';

import { memoize } from 'lodash';

import { UseCertificationsQueryProps } from '../queries/useCertificationsQuery';
import { UseGenresQueryProps } from '../queries/useGenresQuery';
import { UseKeywordsInfiniteQueryProps } from '../queries/useKeywordsInfiniteQuery';
import { UsePopularQueryProps } from '../queries/usePopularQuery';
import { UseSearchInfiniteQueryProps } from '../queries/useSearchInfiniteQuery';
import { UseTopRatedQueryProps } from '../queries/useTopRatedQuery';
import { UseTrendingQueryProps } from '../queries/useTrendingQuery';
import { AxiosConfigParams } from '../types';

export const certificationsQueryKey = memoize(
	({ mediaType }: UseCertificationsQueryProps): QueryKey => [`${mediaType}_certifications`, mediaType]
);

export const countriesQueryKey = memoize((): QueryKey => ['countries']);

export const genresQueryKey = memoize(
	({ mediaType }: UseGenresQueryProps): QueryKey => [`${mediaType}_genres`, mediaType]
);

export const jobsQueryKey = memoize((): QueryKey => ['jobs']);

export const keywordsInfiniteQueryKey = memoize(
	({ query }: UseKeywordsInfiniteQueryProps): QueryKey => [`${query}_search_keywords_infinite`, query]
);

export const languagesQueryKey = memoize((): QueryKey => ['languages']);

export const moviesInfiniteQueryKey = memoize(({ params }: AxiosConfigParams): QueryKey => ['movies', params]);

export const peopleInfiniteQueryKey = memoize(({ params }: AxiosConfigParams): QueryKey => ['people', params]);

export const popularQueryKey = memoize(
	({ mediaType }: UsePopularQueryProps): QueryKey => [`popular_${mediaType}`, mediaType]
);

export const searchInfiniteQueryKey = memoize(
	({ mediaType, query }: UseSearchInfiniteQueryProps): QueryKey => [
		`${query}_${mediaType}_search_infinite`,
		mediaType,
		query
	]
);

export const topRatedQueryKey = memoize(
	({ mediaType }: UseTopRatedQueryProps): QueryKey => [`top_rated_${mediaType}`, mediaType]
);

export const trendingQueryKey = memoize(
	({ mediaType, time }: UseTrendingQueryProps): QueryKey => [`${time}_${mediaType}_trending`, mediaType, time]
);

export const trendingInfiniteQueryKey = memoize(
	({ mediaType, time }: UseTrendingQueryProps): QueryKey => [
		`${time}_${mediaType}_trending_infinite`,
		mediaType,
		time
	]
);

export const tvShowsInfiniteQueryKey = memoize(({ params }: AxiosConfigParams): QueryKey => ['tv_shows', params]);
