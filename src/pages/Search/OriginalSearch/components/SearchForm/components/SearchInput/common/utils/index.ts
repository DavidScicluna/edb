import { memoize, shuffle } from 'lodash';

import {
	movie,
	tv,
	people,
	collections,
	companies,
	combined
} from '../../../../../../../../../common/data/placeholders/search';
import { SearchForm } from '../../../../../../types';

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

	return shuffle(placeholders)[0];
});
