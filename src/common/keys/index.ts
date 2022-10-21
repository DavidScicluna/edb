import { QueryKey } from '@tanstack/react-query';

import { UseCertificationsQueryProps } from '../queries/useCertificationsQuery';
import { UseGenresQueryProps } from '../queries/useGenresQuery';
import { UseKeywordsInfiniteQueryProps } from '../queries/useKeywordsInfiniteQuery';
import { UsePopularQueryProps } from '../queries/usePopularQuery';
import { UseSearchInfiniteQueryProps } from '../queries/useSearchInfiniteQuery';
import { UseTopRatedQueryProps } from '../queries/useTopRatedQuery';
import { UseTrendingQueryProps } from '../queries/useTrendingQuery';
import { AxiosConfigParams } from '../types';
import { memoizeDebounce } from '../scripts';

const timeout = 500;

export const certificationsQueryKey = memoizeDebounce(
	({ mediaType }: UseCertificationsQueryProps): QueryKey => [`${mediaType}_certifications`],
	timeout
);

export const countriesQueryKey = memoizeDebounce((): QueryKey => ['countries'], timeout);

export const genresQueryKey = memoizeDebounce(
	({ mediaType }: UseGenresQueryProps): QueryKey => [`${mediaType}_genres`],
	timeout
);

export const jobsQueryKey = memoizeDebounce((): QueryKey => ['jobs'], timeout);

export const keywordsInfiniteQueryKey = memoizeDebounce(
	({ query }: UseKeywordsInfiniteQueryProps): QueryKey => [`${query}_search_keywords_infinite`],
	timeout
);

export const languagesQueryKey = memoizeDebounce((): QueryKey => ['languages'], timeout);

export const moviesInfiniteQueryKey = memoizeDebounce(
	({ params }: AxiosConfigParams): QueryKey => ['movies', params],
	timeout
);

export const peopleInfiniteQueryKey = memoizeDebounce(
	({ params }: AxiosConfigParams): QueryKey => ['people', params],
	timeout
);

export const popularQueryKey = memoizeDebounce(
	({ mediaType }: UsePopularQueryProps): QueryKey => [`popular_${mediaType}`],
	timeout
);

export const searchInfiniteQueryKey = memoizeDebounce(
	({ mediaType, query }: UseSearchInfiniteQueryProps): QueryKey => [`${query}_${mediaType}_search_infinite`],
	timeout
);

export const topRatedQueryKey = memoizeDebounce(
	({ mediaType }: UseTopRatedQueryProps): QueryKey => [`top_rated_${mediaType}`],
	timeout
);

export const trendingQueryKey = memoizeDebounce(
	({ mediaType, time }: UseTrendingQueryProps): QueryKey => [`${time}_${mediaType}_trending`],
	timeout
);

export const trendingInfiniteQueryKey = memoizeDebounce(
	({ mediaType, time }: UseTrendingQueryProps): QueryKey => [`${time}_${mediaType}_trending_infinite`],
	timeout
);
