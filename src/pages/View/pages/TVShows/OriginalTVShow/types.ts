import { TabsOnChangeProps } from '@davidscicluna/component-library';

import { UseMediaTypeQueryResult } from '../../../../../common/queries/useMediaTypeQuery';
import { UseMediaTypeCreditsQueryResult } from '../../../../../common/queries/useMediaTypeCreditsQuery';
import { UseMediaTypeImagesQueryResult } from '../../../../../common/queries/useMediaTypeImagesQuery';
import { UseMediaTypeVideosQueryResult } from '../../../../../common/queries/useMediaTypeVideosQuery';
import { UseMediaTypeReviewsInfiniteQueryResult } from '../../../../../common/queries/useMediaTypeReviewsInfiniteQuery';

export type TVShowContext = {
	showQuery?: UseMediaTypeQueryResult<'tv'>;
	creditsQuery?: UseMediaTypeCreditsQueryResult<'tv'>;
	reviewsQuery?: UseMediaTypeReviewsInfiniteQueryResult;
	imagesQuery?: UseMediaTypeImagesQueryResult;
	videosQuery?: UseMediaTypeVideosQueryResult;
	onSetActiveTab: (props: TabsOnChangeProps) => void;
};
