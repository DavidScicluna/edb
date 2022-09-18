import { QueryKey } from '@tanstack/react-query';

import { memoize } from 'lodash';

import { UseCertificationsQueryProps } from '../queries/useCertificationsQuery';
import { UseGenresQueryProps } from '../queries/useGenresQuery';
import { UsePopularQueryProps } from '../queries/usePopularQuery';
import { UseTopRatedQueryProps } from '../queries/useTopRatedQuery';
import { UseTrendingQueryProps } from '../queries/useTrendingQuery';

export const countriesQueryKey: QueryKey = ['countries'];

export const jobsQueryKey: QueryKey = ['jobs'];

export const languagesQueryKey: QueryKey = ['languages'];

export const certificationsQueryKey = memoize(
	({ mediaType }: UseCertificationsQueryProps): QueryKey => [`${mediaType}_certifications`]
);

export const genresQueryKey = memoize(({ mediaType }: UseGenresQueryProps): QueryKey => [`${mediaType}_genres`]);

export const popularQueryKey = memoize(({ mediaType }: UsePopularQueryProps): QueryKey => [`popular_${mediaType}`]);

export const topRatedQueryKey = memoize(({ mediaType }: UseTopRatedQueryProps): QueryKey => [`top_rated_${mediaType}`]);

export const trendingQueryKey = memoize(
	({ mediaType, time }: UseTrendingQueryProps): QueryKey => [`${time}_${mediaType}_trending`]
);
