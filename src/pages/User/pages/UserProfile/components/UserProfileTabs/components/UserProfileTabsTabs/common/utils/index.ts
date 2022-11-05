import { memoize } from 'lodash';

import { MediaType } from '../../../../../../../../../../common/types';

type GetMediaTypeIndexProps = { mediaTypes?: MediaType[]; mediaType: MediaType };

// TODO: Method duplicated ... see if we can move to utils

export const getMediaTypeIndex = memoize(({ mediaTypes = [], mediaType }: GetMediaTypeIndexProps): number => {
	return mediaTypes.findIndex((mt) => mt === mediaType) + 1;
});
