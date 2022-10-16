import { memoize } from 'lodash';

import { trendingMediaTypes } from '../..';
import { TrendingMediaType } from '../../types';

type GetMediaTypeIndexProps = { mediaType: TrendingMediaType };

export const getMediaTypeIndex = memoize(({ mediaType }: GetMediaTypeIndexProps): number => {
	return trendingMediaTypes.findIndex((mt) => mt === mediaType) + 1;
});
