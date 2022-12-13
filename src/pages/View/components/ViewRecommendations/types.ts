import { MediaType } from '../../../../common/types';
import { FullMovie } from '../../../../common/types/movie';
import { FullTV } from '../../../../common/types/tv';

export type ViewRecommendationsMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type ViewRecommendationsGetMediaItemType<MT extends MediaType> = MT extends 'movie' ? FullMovie : FullTV;

export type ViewRecommendationsProps<MT extends ViewRecommendationsMediaType> = {
	mediaType: MT;
	mediaItem?: ViewRecommendationsGetMediaItemType<MT>;
};
