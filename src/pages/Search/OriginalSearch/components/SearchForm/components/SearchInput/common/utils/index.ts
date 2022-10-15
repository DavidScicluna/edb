import { memoize, sample, shuffle } from 'lodash';

import { SearchForm } from '../../../../../../types';
import { movie, tv, people, collections, companies, combined } from '../data/placeholders';

type GetPlaceholderProps = { searchTypes: SearchForm['searchTypes'] };

export const getPlaceholder = memoize(({ searchTypes = [] }: GetPlaceholderProps): string => {
	let placeholders = [];

	if (searchTypes.length === 1) {
		const searchType = searchTypes[0];

		switch (searchType) {
			case 'movie':
				placeholders = [...movie];
				break;
			case 'tv':
				placeholders = [...tv];
				break;
			case 'person':
				placeholders = [...people];
				break;
			case 'collection':
				placeholders = [...collections];
				break;
			case 'company':
				placeholders = [...companies];
				break;
			default:
				placeholders = [...combined];
				break;
		}
	} else {
		placeholders = [...combined];
	}

	return sample(placeholders) || shuffle(placeholders)[0];
});
