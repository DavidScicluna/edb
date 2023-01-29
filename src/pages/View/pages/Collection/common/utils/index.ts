import { memoize } from 'lodash';

import { formatMediaType } from '../../../../../../common/utils';
import { overviewTabIndex, moviesTabIndex, photosTabIndex } from '../data/tabs';

type GetTabIndexHash = 'overview' | 'credits' | 'photos';

export const getCollectionTabIndex = memoize((hash: GetTabIndexHash): number => {
	switch (hash) {
		case formatMediaType({ mediaType: 'movie' }):
			return moviesTabIndex;
		case 'photos':
			return photosTabIndex;
		case 'overview':
		default:
			return overviewTabIndex;
	}
});
