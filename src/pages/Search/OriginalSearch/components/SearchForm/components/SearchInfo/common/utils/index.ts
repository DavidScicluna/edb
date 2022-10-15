import { memoize } from 'lodash';

import { SearchForm } from '../../../../../../types';
import { SearchInfoProps } from '../../types';

type GetTotalProps = Pick<SearchInfoProps, 'total'>;

export const getTotal = memoize(({ total }: GetTotalProps): number => {
	const { movie = 0, tv = 0, person = 0, collection = 0, company = 0 } = total;

	return movie + tv + person + collection + company;
});

type GetSuffixProps = { searchTypes: SearchForm['searchTypes'] } & Pick<SearchInfoProps, 'total'>;

export const getSuffix = memoize(({ searchTypes = [], total }: GetSuffixProps): string => {
	if (searchTypes.length === 1) {
		const searchType = searchTypes[0];
		const sum = searchTypes.reduce(
			(value, searchType) => value + (total && total[searchType] ? total[searchType] : 0),
			0
		);

		switch (searchType) {
			case 'collection':
				return `Collection${sum === 1 ? '' : 's'}`;
			case 'company':
				return `${sum === 1 ? 'Companies' : 'company'}`;
			case 'person':
				return `${sum === 1 ? 'People' : 'Person'}`;
			case 'tv':
				return `TV Show${sum === 1 ? '' : 's'}`;
			case 'movie':
				return `Movie${sum === 1 ? '' : 's'}`;
			default:
				return '';
		}
	} else {
		return `result${getTotal({ total }) === 1 ? '' : 's'}`;
	}
});
