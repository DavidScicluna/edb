import { QueryKey } from '@tanstack/react-query';

import { memoize } from 'lodash';

import { UseCertificationsQueryProps } from '../queries/useCertificationsQuery';

export const countriesQueryKey: QueryKey = ['countries'];

export const jobsQueryKey: QueryKey = ['jobs'];

export const languagesQueryKey: QueryKey = ['languages'];

export const movieGenresQueryKey: QueryKey = ['movie_genres'];
export const certificationsQueryKey = memoize(
	({ mediaType }: UseCertificationsQueryProps): QueryKey => [`${mediaType}_certifications`]
);

export const tvShowGenresQueryKey: QueryKey = ['tv_show_genres'];
