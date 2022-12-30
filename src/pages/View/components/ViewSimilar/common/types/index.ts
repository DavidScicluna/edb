import { MediaType } from '../../../../../../common/types';

export type ViewSimilarMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type CommonViewSimilarProps<MT extends ViewSimilarMediaType> = { mediaType: MT };
