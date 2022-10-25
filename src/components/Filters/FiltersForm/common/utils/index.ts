import { sort } from 'fast-sort';
import { memoize } from 'lodash';

import { FiltersFormNumbers } from '../../../types';

type FiltersFormNumbersProps = { list?: FiltersFormNumbers; number: number };

export const getIsFiltersFormNumbersInList = memoize(({ list = [], number }: FiltersFormNumbersProps): boolean => {
	if (list.some((num) => num === number)) {
		return true;
	} else if (list && list[0] && list[1]) {
		return list[0] < number && list[1] > number;
	} else {
		return false;
	}
});

export const getFiltersFormNumbers = memoize(({ list = [], number }: FiltersFormNumbersProps) => {
	return sort(
		list.some((num) => num === number)
			? [...list].filter((num) => num !== number)
			: list.length > 1
			? [...list, number].filter((_num, index) => index !== 0)
			: [...list, number]
	).asc();
});
