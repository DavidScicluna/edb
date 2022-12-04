import { MediaType } from '../../../../common/types';

export type PersonMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;
