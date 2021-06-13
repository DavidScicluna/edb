import { MediaType } from '../../../../../../common/types/types';
import { TypeItem } from '../../types';

export type TypeProps = { isActive?: boolean; onClick: (mediaType: MediaType) => void } & TypeItem;
