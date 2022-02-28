import { MediaType } from '../../../../../common/types';
import { Filters } from '../../../types';

export type DatesProps = {
	dates: Filters['dates'];
	mediaType: Omit<MediaType, 'person' | 'collection' | 'company'>;
	onClick?: () => void;
	onDelete?: () => void;
};
