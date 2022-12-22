import { MediaType } from '../../../../../../common/types';

export type ViewInfoDateItemMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type ViewInfoDateItemProps = { mediaType: ViewInfoDateItemMediaType; date: string };
