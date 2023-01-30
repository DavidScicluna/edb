import { memoize } from 'lodash';

import { UserRecentlyViewed } from '../../../../../store/slices/Users/types';
import { RecentlyViewedStatus } from '../../types';

export const getRecentlyViewedStatus = memoize((props: UserRecentlyViewed): RecentlyViewedStatus => {
	const { movie = [], tv = [], person = [], collection = [] } = props;

	if (movie.length === 0 && tv.length === 0 && person.length === 0 && collection.length === 0) {
		return 'empty';
	} else {
		let counter = 0;

		if (movie.length > 0) {
			counter = counter + 1;
		}

		if (tv.length > 0) {
			counter = counter + 1;
		}

		if (person.length > 0) {
			counter = counter + 1;
		}

		if (collection.length > 0) {
			counter = counter + 1;
		}

		return counter > 1 ? 'multiple' : 'single';
	}
});
