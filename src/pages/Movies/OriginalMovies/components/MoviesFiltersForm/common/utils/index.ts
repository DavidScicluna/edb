import { Location } from 'react-router';

import { isEmpty, isNil, memoize } from 'lodash';

import { getFiltersForm } from '../../../../../../../components/Filters/common/utils';
import { FiltersForm } from '../../../../../../../components/Filters/types';

type GetTotalFiltersProps = { location: Partial<Location> };

export const getTotalFilters = memoize(({ location }: GetTotalFiltersProps): number => {
	const filters: FiltersForm = getFiltersForm({ location, mediaType: 'movie' });
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
