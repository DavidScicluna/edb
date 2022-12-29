import { MediaType } from '../../../../../../common/types';

export type ViewCastMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type CommonViewCastProps<MT extends ViewCastMediaType> = { mediaType: MT };
