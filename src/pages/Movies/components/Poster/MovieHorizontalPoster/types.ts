import { PartialMovie } from '../../../../../common/types/movie';
import { HorizontalPosterProps } from '../../../../../components/Posters/HorizontalPoster/types';

type Omitted =
	| 'mediaItem'
	| 'mediaType'
	| 'image'
	| 'rating'
	| 'title'
	| 'subtitle'
	| 'description'
	| 'isFullWidth'
	| 'isLight';

export type MovieHorizontalPosterProps = Omit<HorizontalPosterProps<'movie'>, Omitted> & {
	movie: PartialMovie;
};
