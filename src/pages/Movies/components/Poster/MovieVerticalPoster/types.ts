import { PartialMovie } from '../../../../../common/types/movie';
import { VerticalPosterProps } from '../../../../../components/Posters/VerticalPoster/types';

type Omitted = 'mediaItem' | 'mediaType' | 'image' | 'rating' | 'title' | 'subtitle' | 'isFullWidth' | 'isLight';

export type MovieVerticalPosterProps = Omit<VerticalPosterProps<'movie'>, Omitted> & {
	movie: PartialMovie;
};
