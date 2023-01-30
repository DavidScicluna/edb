import { FullMovie } from '../../../../../common/types/movie';
import { FullTVShow } from '../../../../../common/types/tv';
import { CommonViewSimilarProps, ViewSimilarMediaType } from '../common/types';

export type ViewSimilarGetMediaItemType<MT extends ViewSimilarMediaType> = MT extends 'movie' ? FullMovie : FullTVShow;

export type ViewSimilarProps<MT extends ViewSimilarMediaType> = CommonViewSimilarProps<MT> & {
	mediaItem?: ViewSimilarGetMediaItemType<MT>;
};
