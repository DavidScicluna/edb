import { ViewReviewsMediaType, ViewReviewsProps } from '../../types';

type Picked = 'mediaType' | 'mediaItem' | 'name';

export type ViewReviewsMyReviewsProps<MT extends ViewReviewsMediaType> = Pick<ViewReviewsProps<MT>, Picked>;
