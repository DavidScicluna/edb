import { MediaType } from '../../../../../../common/types';

export type ViewInfoRuntimeItemMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type ViewInfoRuntimeItemProps = { mediaType: ViewInfoRuntimeItemMediaType; runtime: number };
