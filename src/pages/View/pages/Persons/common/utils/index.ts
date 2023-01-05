import { memoize } from 'lodash';

import { overviewTabIndex, creditsTabIndex, photosTabIndex } from '../data/tabs';

type GetTabIndexHash = 'overview' | 'credits' | 'photos';

export const getPersonTabIndex = memoize((hash: GetTabIndexHash): number => {
	switch (hash) {
		case 'credits':
			return creditsTabIndex;
		case 'photos':
			return photosTabIndex;
		case 'overview':
		default:
			return overviewTabIndex;
	}
});
