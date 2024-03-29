import { Undefinable } from '@davidscicluna/component-library';

import { memoize } from 'lodash';
import qs from 'query-string';

import { SortBy, Sort, SortDirection, SortByForm, SortByMediaType } from '../../types';
import { movieSortBy, tvSortBy } from '../data';
import defaultValues from '../data/defaults';

type GetSortByProps = { location: Partial<Location>; mediaType: SortByMediaType };

export const getSortByForm = memoize(({ location, mediaType }: GetSortByProps): SortByForm => {
	const form: SortByForm = { ...defaultValues };
	const search = qs.parse(location.search || '');

	if (search && search['sort_by'] && typeof search['sort_by'] === 'string') {
		const sortBy: SortBy = mediaType === 'movie' ? [...movieSortBy] : [...tvSortBy];
		const splitSort = String(search['sort_by']).split('.');
		const sort: Undefinable<Sort> = sortBy.find(({ value }) => value === splitSort[0]);
		const direction: Undefinable<SortDirection> = splitSort ? (splitSort[1] === 'asc' ? 'asc' : 'desc') : undefined;

		if (sort) {
			form.sortBy = { ...sort };
		}

		if (direction) {
			form.direction = direction;
		}
	}

	return form;
});
