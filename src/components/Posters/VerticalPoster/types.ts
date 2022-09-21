import { CardProps } from '@davidscicluna/component-library';

import { MediaType } from '../../../common/types';
import { MediaItem } from '../../../store/slices/Users/types';
import { RatingProps } from '../../Ratings/Rating/types';
import { PosterImage } from '../common/types';

export type VerticalPosterProps<MT extends MediaType> = Omit<CardProps, 'children'> & {
	image: PosterImage;
	rating?: Pick<RatingProps, 'rating' | 'count'>;
	title: string;
	subtitle?: string;
} & Pick<MediaItem<MT>, 'mediaItem' | 'mediaType'>;
