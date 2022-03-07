import { MediaType } from '../../../../../common/types';
import { HorizontalPosterProps } from '../../types';

export type PosterImageProps<MT extends MediaType> = {
	inView: boolean;
} & Omit<HorizontalPosterProps<MT>, 'mediaItem' | 'rating' | 'title' | 'subtitle' | 'description'>;
