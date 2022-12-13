import { MediaType } from '../../../../common/types';
import { FullMovie } from '../../../../common/types/movie';
import { FullTV } from '../../../../common/types/tv';

export type ViewSimilarMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type ViewSimilarGetMediaItemType<MT extends MediaType> = MT extends 'movie' ? FullMovie : FullTV;

export type ViewSimilarProps<MT extends ViewSimilarMediaType> = {
	mediaType: MT;
	mediaItem?: ViewSimilarGetMediaItemType<MT>;
};
