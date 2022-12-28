import { UseMediaTypeReviewsInfiniteQueryResult } from '../../../../common/queries/useMediaTypeReviewsInfiniteQuery';
import { MediaType } from '../../../../common/types';
import { GetMediaType } from '../../../../store/slices/Users/types';

export type ViewReviewsMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export interface ViewReviewsProps<MT extends ViewReviewsMediaType> {
	mediaType: MT;
	mediaItem: GetMediaType<MT>;
	query: UseMediaTypeReviewsInfiniteQueryResult;
	name?: string;
}
