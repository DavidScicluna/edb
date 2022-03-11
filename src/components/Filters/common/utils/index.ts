import compact from 'lodash/compact';
import qs from 'query-string';

import { Filters, FiltersMediaTypes } from '../../types';

export const handleReturnDefaultValues = (): Filters => {
	return {
		dates: { gte: null, lte: null },
		genres: [],
		certifications: [],
		rating: [],
		count: [],
		runtime: []
	};
};

export const handlePopulateFilters = (locationSearch: string, mediaType: FiltersMediaTypes): Filters => {
	const search = qs.parse(locationSearch);

	const filters: Filters = handleReturnDefaultValues();

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
	} else if (mediaType === 'tv') {
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

	if (search['with_genres'] && typeof search['with_genres'] === 'string') {
		filters.genres = search['with_genres'].split(',').map((genre) => Number(genre));
	}

	if (search['certification'] && typeof search['certification'] === 'string') {
		filters.certifications = search['certification'].split('|').map((certification) => certification);
	}

	if (search['vote_average.gte'] && typeof search['vote_average.gte'] === 'string') {
		filters.rating = compact([
			Number(search['vote_average.gte']),
			filters.rating && filters.rating[1] ? Number(filters.rating[1]) : null
		]);
	}

	if (search['vote_average.lte'] && typeof search['vote_average.lte'] === 'string') {
		filters.rating = compact([
			filters.rating && filters.rating[0] ? Number(filters.rating[0]) : null,
			Number(search['vote_average.lte'])
		]);
	}

	if (search['vote_count.gte'] && typeof search['vote_count.gte'] === 'string') {
		filters.count = compact([
			Number(search['vote_count.gte']),
			filters.count && filters.count[1] ? Number(filters.count[1]) : null
		]);
	}

	if (search['vote_count.lte'] && typeof search['vote_count.lte'] === 'string') {
		filters.count = compact([
			filters.count && filters.count[0] ? Number(filters.count[0]) : null,
			Number(search['vote_count.lte'])
		]);
	}

	if (search['with_runtime.gte'] && typeof search['with_runtime.gte'] === 'string') {
		filters.runtime = compact([
			Number(search['with_runtime.gte']),
			filters.runtime && filters.runtime[1] ? Number(filters.runtime[1]) : null
		]);
	}

	if (search['with_runtime.lte'] && typeof search['with_runtime.lte'] === 'string') {
		filters.runtime = compact([
			filters.runtime && filters.runtime[0] ? Number(filters.runtime[0]) : null,
			Number(search['with_runtime.lte'])
		]);
	}

	return filters;
};
