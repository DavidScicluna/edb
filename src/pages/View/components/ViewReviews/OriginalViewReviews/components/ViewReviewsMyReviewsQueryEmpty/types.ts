import { QueryEmptyProps } from '../../../../../../../components/QueryEmpty/types';
import { ViewReviewsMediaType, ViewReviewsProps } from '../../types';

type Picked = 'mediaType' | 'mediaItem' | 'name';

export type ViewReviewsMyReviewsQueryEmptyProps<MT extends ViewReviewsMediaType> = Pick<ViewReviewsProps<MT>, Picked> &
	Omit<QueryEmptyProps, 'color' | 'colorMode'>;
