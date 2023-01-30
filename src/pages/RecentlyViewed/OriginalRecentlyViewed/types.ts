import { MediaType } from '../../../common/types';

export type RecentlyViewedStatus = 'empty' | 'multiple' | 'single' | 'hidden';

export type RecentlyViewedMediaType = Exclude<MediaType, 'company'>;
export type RecentlyViewedMediaTypes = RecentlyViewedMediaType[];
