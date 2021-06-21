import { MediaType } from '../../../../common/types/types';
import { MediaTypeItem } from '../../types';

export type MediaTypeItemProps = { isActive?: boolean; onClick: (mediaType: MediaType) => void } & MediaTypeItem;
