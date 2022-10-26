import { PartialMovie } from '../../../common/types/movie';
import { VerticalPosterProps } from '../VerticalPoster/types';

type Omitted = 'mediaItem' | 'mediaType' | 'image' | 'rating' | 'title' | 'subtitle' | 'isFullWidth' | 'isLight';

export type MovieVerticalPosterProps = Omit<VerticalPosterProps<'movie'>, Omitted> & {
	movie: PartialMovie;
};
