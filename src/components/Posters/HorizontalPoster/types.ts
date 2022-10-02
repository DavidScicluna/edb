import { CardProps } from '@davidscicluna/component-library';

import { MediaType } from '../../../common/types';
import { MediaItem } from '../../../store/slices/Users/types';
import { RatingProps } from '../../Ratings/Rating/types';
import { PosterImage } from '../common/types';

export type HorizontalPosterRating = Pick<RatingProps, 'rating' | 'count'>;

export type HorizontalPosterProps<MT extends MediaType> = Omit<CardProps, 'children'> & {
	image: PosterImage;
	rating?: HorizontalPosterRating;
	title: string;
	subtitle?: string;
	description?: string;
} & Pick<MediaItem<MT>, 'mediaItem' | 'mediaType'>;
