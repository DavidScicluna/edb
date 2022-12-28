import { ViewReviewsMediaType, ViewReviewsProps } from '../../types';

type Picked = 'mediaType' | 'query' | 'name';

export type ViewReviewsOtherReviewsProps<MT extends ViewReviewsMediaType> = Pick<ViewReviewsProps<MT>, Picked>;
