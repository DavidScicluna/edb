import { MediaType } from '../../../../../common/types';
import { Filters } from '../../../types';

export type GenresProps = {
	genres: Filters['genres'];
	mediaType: Omit<MediaType, 'person' | 'collection' | 'company'>;
	onClick?: () => void;
	onDelete?: () => void;
};
