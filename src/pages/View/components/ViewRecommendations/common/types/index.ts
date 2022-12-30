import { MediaType } from '../../../../../../common/types';

export type ViewRecommendationsMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type CommonViewRecommendationsProps<MT extends ViewRecommendationsMediaType> = { mediaType: MT };
