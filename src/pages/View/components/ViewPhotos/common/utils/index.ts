import { memoize, sample } from 'lodash';

import { ViewPhotosHorizontalGridOrientation } from '../../../ViewPhotosHorizontalGrid/common/types';
import {
	landscapeDefaultHeight,
	landscapeHeights,
	portraitDefaultHeight,
	portraitHeights,
	squareDefaultHeight,
	squareHeights
} from '../data/heights';

type GetPhotoHeightProps = { orientation: ViewPhotosHorizontalGridOrientation };

export const getPhotoHeight = memoize(({ orientation }: GetPhotoHeightProps): number => {
	return orientation === 'landscape'
		? sample(landscapeHeights) || landscapeDefaultHeight
		: orientation === 'portrait'
		? sample(portraitHeights) || portraitDefaultHeight
		: sample(squareHeights) || squareDefaultHeight;
});
