import { MediaType } from '../../../common/types';

export type TrendingMediaType = Exclude<MediaType, 'company' | 'collection'>;
export type TrendingMediaTypes = TrendingMediaType[];
