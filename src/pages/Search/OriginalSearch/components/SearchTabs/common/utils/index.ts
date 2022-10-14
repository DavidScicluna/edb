import { memoize } from 'lodash';

import { SearchMediaType, SearchMediaTypes } from '../../../../types';

type GetMediaTypeIndexProps = { searchMediaTypes?: SearchMediaTypes; mediaType: SearchMediaType };

export const getMediaTypeIndex = memoize(({ searchMediaTypes = [], mediaType }: GetMediaTypeIndexProps): number => {
	return searchMediaTypes.findIndex((mt) => mt === mediaType) + 1;
});
