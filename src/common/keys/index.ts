import { QueryKey } from '@tanstack/react-query';

import { memoize } from 'lodash';

import { UseCertificationsQueryProps } from '../queries/useCertificationsQuery';
import { UseGenresQueryProps } from '../queries/useGenresQuery';

export const countriesQueryKey: QueryKey = ['countries'];

export const jobsQueryKey: QueryKey = ['jobs'];

export const languagesQueryKey: QueryKey = ['languages'];

export const certificationsQueryKey = memoize(
	({ mediaType }: UseCertificationsQueryProps): QueryKey => [`${mediaType}_certifications`]
);

export const genresQueryKey = memoize(({ mediaType }: UseGenresQueryProps): QueryKey => [`${mediaType}_genres`]);
