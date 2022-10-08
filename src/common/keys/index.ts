import { QueryKey } from '@tanstack/react-query';

import { memoize } from 'lodash';

import { UseCertificationsQueryProps } from '../queries/useCertificationsQuery';
import { UseGenresQueryProps } from '../queries/useGenresQuery';
import { UseKeywordsInfiniteQueryProps } from '../queries/useKeywordsInfiniteQuery';
import { UsePopularQueryProps } from '../queries/usePopularQuery';
import { UseTopRatedQueryProps } from '../queries/useTopRatedQuery';
import { UseTrendingQueryProps } from '../queries/useTrendingQuery';

export const certificationsQueryKey = memoize(
	({ mediaType }: UseCertificationsQueryProps): QueryKey => [`${mediaType}_certifications`]
);

export const countriesQueryKey: QueryKey = ['countries'];

export const genresQueryKey = memoize(({ mediaType }: UseGenresQueryProps): QueryKey => [`${mediaType}_genres`]);

export const jobsQueryKey: QueryKey = ['jobs'];

export const keywordsInfiniteQueryKey = memoize(
	({ query }: UseKeywordsInfiniteQueryProps): QueryKey => [`${query}_search_keywords_infinite`]
);

export const languagesQueryKey: QueryKey = ['languages'];

export const popularQueryKey = memoize(({ mediaType }: UsePopularQueryProps): QueryKey => [`popular_${mediaType}`]);

export const topRatedQueryKey = memoize(({ mediaType }: UseTopRatedQueryProps): QueryKey => [`top_rated_${mediaType}`]);

export const trendingQueryKey = memoize(
	({ mediaType, time }: UseTrendingQueryProps): QueryKey => [`${time}_${mediaType}_trending`]
);

export const trendingInfiniteQueryKey = memoize(
	({ mediaType, time }: UseTrendingQueryProps): QueryKey => [`${time}_${mediaType}_trending_infinite`]
);
