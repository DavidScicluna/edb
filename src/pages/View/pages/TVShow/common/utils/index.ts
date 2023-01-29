import { memoize } from 'lodash';

import {
	overviewTabIndex,
	castTabIndex,
	crewTabIndex,
	seasonsTabIndex,
	episodesTabIndex,
	reviewsTabIndex,
	photosTabIndex,
	videosTabIndex
} from '../data/tabs';

type GetTabIndexHash = 'overview' | 'cast' | 'crew' | 'seasons' | 'episodes' | 'reviews' | 'photos' | 'videos';

export const getTVShowTabIndex = memoize((hash: GetTabIndexHash): number => {
	switch (hash) {
		case 'cast':
			return castTabIndex;
		case 'crew':
			return crewTabIndex;
		case 'seasons':
			return seasonsTabIndex;
		case 'episodes':
			return episodesTabIndex;
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
