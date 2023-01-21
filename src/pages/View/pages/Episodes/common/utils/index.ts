import { memoize } from 'lodash';

import { overviewTabIndex, castTabIndex, guestStarsTabIndex, crewTabIndex, photosTabIndex } from '../data/tabs';

type GetTabIndexHash = 'overview' | 'cast' | 'guest_stars' | 'crew' | 'photos';

export const getCollectionTabIndex = memoize((hash: GetTabIndexHash): number => {
	switch (hash) {
		case 'cast':
			return castTabIndex;
		case 'guest_stars':
			return guestStarsTabIndex;
		case 'crew':
			return crewTabIndex;
		case 'photos':
			return photosTabIndex;
		case 'overview':
		default:
			return overviewTabIndex;
	}
});
