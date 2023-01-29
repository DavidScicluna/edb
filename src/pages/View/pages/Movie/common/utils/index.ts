import { memoize } from 'lodash';

import {
	overviewTabIndex,
	castTabIndex,
	crewTabIndex,
	reviewsTabIndex,
	videosTabIndex,
	photosTabIndex
} from '../data/tabs';

type GetTabIndexHash = 'overview' | 'cast' | 'crew' | 'reviews' | 'photos' | 'videos';

export const getMovieTabIndex = memoize((hash: GetTabIndexHash): number => {
	switch (hash) {
		case 'cast':
			return castTabIndex;
		case 'crew':
			return crewTabIndex;
		case 'reviews':
			return reviewsTabIndex;
		case 'photos':
			return photosTabIndex;
		case 'videos':
			return videosTabIndex;
		case 'overview':
		default:
			return overviewTabIndex;
	}
});
