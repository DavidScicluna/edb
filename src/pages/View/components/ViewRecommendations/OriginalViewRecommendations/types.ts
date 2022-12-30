import { FullMovie } from '../../../../../common/types/movie';
import { FullTV } from '../../../../../common/types/tv';
import { CommonViewRecommendationsProps, ViewRecommendationsMediaType } from '../common/types';

export type ViewRecommendationsGetMediaItemType<MT extends ViewRecommendationsMediaType> = MT extends 'movie'
	? FullMovie
	: FullTV;

export type ViewRecommendationsProps<MT extends ViewRecommendationsMediaType> = CommonViewRecommendationsProps<MT> & {
	mediaItem?: ViewRecommendationsGetMediaItemType<MT>;
};
