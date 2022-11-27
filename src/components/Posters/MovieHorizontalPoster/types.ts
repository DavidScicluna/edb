import { PartialMovie } from '../../../common/types/movie';
import { HorizontalPosterProps } from '../HorizontalPoster/types';

type Omitted = 'mediaItem' | 'mediaType' | 'image' | 'rating' | 'title' | 'isFullWidth' | 'isLight';

export type MovieHorizontalPosterProps = Omit<HorizontalPosterProps<'movie'>, Omitted> & {
	movie: PartialMovie;
};
