import { memoize } from 'lodash';
import numbro from 'numbro';

import { MediaType } from '../../../../../../../../../common/types';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { SearchForm } from '../../../../../../types';
import { SearchInfosCommonProps } from '../types';

type GetTotalProps = Pick<SearchInfosCommonProps, 'total'>;

export const getTotal = memoize(({ total }: GetTotalProps): number => {
	const { movie = 0, tv = 0, person = 0, collection = 0, company = 0 } = total;

	return movie + tv + person + collection + company;
});

type GetLabelProps = { searchTypes: SearchForm['searchTypes']; end: number };

export const getLabel = memoize(({ searchTypes = [], end }: GetLabelProps): string => {
	if (searchTypes.length === 1) {
		const searchType = searchTypes[0];

		return `A total of ${numbro(end).format({ thousandSeparated: true })} ${formatMediaTypeLabel({
			type: end === 1 ? 'single' : 'multiple',
			mediaType: searchType as MediaType
		})} found!`;
	} else {
		return `A total of ${numbro(end).format({ thousandSeparated: true })} result${end === 1 ? '' : 's'} found!`;
	}
});
