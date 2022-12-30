import { FullMovie } from '../../../../../common/types/movie';
import { FullTV } from '../../../../../common/types/tv';
import { CommonViewSimilarProps, ViewSimilarMediaType } from '../common/types';

export type ViewSimilarGetMediaItemType<MT extends ViewSimilarMediaType> = MT extends 'movie' ? FullMovie : FullTV;

export type ViewSimilarProps<MT extends ViewSimilarMediaType> = CommonViewSimilarProps<MT> & {
	mediaItem?: ViewSimilarGetMediaItemType<MT>;
};
