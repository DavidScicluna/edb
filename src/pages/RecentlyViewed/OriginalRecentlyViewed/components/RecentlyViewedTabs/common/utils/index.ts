import { memoize } from 'lodash';

import { RecentlyViewedMediaType, RecentlyViewedMediaTypes } from '../../../../types';

type GetMediaTypeIndexProps = { mediaTypes?: RecentlyViewedMediaTypes; mediaType: RecentlyViewedMediaType };

export const getMediaTypeIndex = memoize(({ mediaTypes = [], mediaType }: GetMediaTypeIndexProps): number => {
	return mediaTypes.findIndex((mt) => mt === mediaType) + 1;
});
