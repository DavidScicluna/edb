import { isEmpty, isNil, memoize } from 'lodash';
import compact from 'lodash/compact';
import qs from 'query-string';

import { FiltersForm, FiltersMediaType } from '../../types';
import defaultValues from '../data/defaults';

type GetProps = { location: Partial<Location>; mediaType: FiltersMediaType };

export const getFiltersForm = memoize(({ location, mediaType }: GetProps): FiltersForm => {
	const filters: FiltersForm = { ...defaultValues };
	const search = qs.parse(location.search || '');

	if (mediaType === 'movie') {
		if (
			search['primary_release_date.gte'] &&
			typeof search['primary_release_date.gte'] === 'string' &&
			search['primary_release_date.lte'] &&
			typeof search['primary_release_date.lte'] === 'string'
		) {
			filters.dates = {
				gte: search['primary_release_date.gte'],
				lte: search['primary_release_date.lte']
			};
		} else if (search['primary_release_date.gte'] && typeof search['primary_release_date.gte'] === 'string') {
			filters.dates.gte = search['primary_release_date.gte'];
		}
	} else {
		if (
			search['first_air_date.gte'] &&
			typeof search['first_air_date.gte'] === 'string' &&
			search['first_air_date.lte'] &&
			typeof search['first_air_date.lte'] === 'string'
		) {
			filters.dates = {
				gte: search['first_air_date.gte'],
				lte: search['first_air_date.lte']
			};
		} else if (search['first_air_date.gte'] && typeof search['first_air_date.gte'] === 'string') {
			filters.dates.gte = search['first_air_date.gte'];
		}
	}

	if (search && search['with_genres'] && typeof search['with_genres'] === 'string') {
		filters.genres = search['with_genres'].split(',').map((genre) => Number(genre));
	}

	if (search && search['certification'] && typeof search['certification'] === 'string') {
		filters.certifications = search['certification'].split('|').map((certification) => certification);
	}

	if (search && search['vote_average.gte'] && typeof search['vote_average.gte'] === 'string') {
		filters.rating = compact([
			Number(search['vote_average.gte']),
			filters.rating && filters.rating[1] ? Number(filters.rating[1]) : null
		]);
	}

	if (search && search['vote_average.lte'] && typeof search['vote_average.lte'] === 'string') {
		filters.rating = compact([
			filters.rating && filters.rating[0] ? Number(filters.rating[0]) : null,
			Number(search['vote_average.lte'])
		]);
	}

	if (search && search['vote_count.gte'] && typeof search['vote_count.gte'] === 'string') {
		filters.count = compact([
			Number(search['vote_count.gte']),
			filters.count && filters.count[1] ? Number(filters.count[1]) : null
		]);
	}

	if (search && search['vote_count.lte'] && typeof search['vote_count.lte'] === 'string') {
		filters.count = compact([
			filters.count && filters.count[0] ? Number(filters.count[0]) : null,
			Number(search['vote_count.lte'])
		]);
	}

	if (search && search['with_runtime.gte'] && typeof search['with_runtime.gte'] === 'string') {
		filters.runtime = compact([
			Number(search['with_runtime.gte']),
			filters.runtime && filters.runtime[1] ? Number(filters.runtime[1]) : null
		]);
	}

	if (search && search['with_runtime.lte'] && typeof search['with_runtime.lte'] === 'string') {
		filters.runtime = compact([
			filters.runtime && filters.runtime[0] ? Number(filters.runtime[0]) : null,
			Number(search['with_runtime.lte'])
		]);
	}

	return filters;
});

export const getTotalFilters = memoize(({ location, mediaType }: GetProps): number => {
	const filters: FiltersForm = getFiltersForm({ location, mediaType });
	let key: keyof FiltersForm;
	let total = 0;

	for (key in filters) {
		if (
			key === 'dates' &&
			(!(isNil(filters.dates.gte) || isEmpty(filters.dates.gte)) ||
				!(isNil(filters.dates.lte) || isEmpty(filters.dates.lte)))
		) {
			total = total + 1;
		} else if (key !== 'dates' && !(isNil(filters[key]) || isEmpty(filters[key]))) {
			total = total + 1;
		}
	}

	return total;
});
