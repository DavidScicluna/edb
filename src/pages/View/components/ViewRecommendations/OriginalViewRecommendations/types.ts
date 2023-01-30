import { FullMovie } from '../../../../../common/types/movie';
import { FullTVShow } from '../../../../../common/types/tv';
import { CommonViewRecommendationsProps, ViewRecommendationsMediaType } from '../common/types';

export type ViewRecommendationsGetMediaItemType<MT extends ViewRecommendationsMediaType> = MT extends 'movie'
	? FullMovie
	: FullTVShow;

export type ViewRecommendationsProps<MT extends ViewRecommendationsMediaType> = CommonViewRecommendationsProps<MT> & {
	mediaItem?: ViewRecommendationsGetMediaItemType<MT>;
};
