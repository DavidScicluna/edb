import { Location } from 'react-router';

import { compact, memoize } from 'lodash';
import qs from 'query-string';

import { SearchQueryDataStatus, SearchForm } from '../../types';

type GetKeywordsVisibilityProps = {
	location: Partial<Location>;
	watchQuery: string;
	isSearchInputFocused?: boolean;
	total?: number;
};

export const getKeywordsVisibility = memoize((props: GetKeywordsVisibilityProps): boolean => {
	const { location, watchQuery, isSearchInputFocused = false, total = 0 } = props;

	const search = qs.parse(location.search || '');
	const query = search && search.query && typeof search.query === 'string' ? search.query : '';

	return watchQuery.length > 0 && watchQuery !== query && isSearchInputFocused && total > 0;
});

type GetQueryDataStatusProps = {
	movies?: number;
	shows?: number;
	people?: number;
	companies?: number;
	collections?: number;
};

export const getQueryDataStatus = memoize((props: GetQueryDataStatusProps): SearchQueryDataStatus => {
	const { movies = 0, shows = 0, people = 0, companies = 0, collections = 0 } = props;

	if (movies === 0 && shows === 0 && people === 0 && companies === 0 && collections === 0) {
		return 'empty';
	} else {
		let counter = 0;

		if (movies > 0) {
			counter = counter + 1;
		}

		if (shows > 0) {
			counter = counter + 1;
		}

		if (people > 0) {
			counter = counter + 1;
		}

		if (companies > 0) {
			counter = counter + 1;
		}

		if (collections > 0) {
			counter = counter + 1;
		}

		return counter > 1 ? 'multiple' : 'single';
	}
});

type GetFromSearchProps = { location: Location };

export const getQueryFromSearch = memoize(({ location }: GetFromSearchProps): SearchForm['query'] => {
	const search = qs.parse(location.search);

	return search && search.query && typeof search.query === 'string' ? search.query : '';
});

export const getSearchTypesFromSearch = memoize(({ location }: GetFromSearchProps): SearchForm['searchTypes'] => {
	const search = qs.parse(location.search);

	return search && search.searchTypes && Array.isArray(search.searchTypes) ? compact(search.searchTypes) : [];
});
