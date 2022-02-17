import { MediaType } from '../../../common/types';
import { MediaItem } from '../../../store/slices/User/types';
import { Image as ImageProps } from '../../Image/types';
import { Rating } from '../../Rating/types';

export type VerticalPosterProps<MT extends MediaType> = {
	width?: string | string[];
	mediaItem?: MediaItem<MT>;
	mediaType: MediaType;
	image?: ImageProps;
	rating?: Rating;
	title: string;
	subtitle: string;
	isLoading: boolean;
};
