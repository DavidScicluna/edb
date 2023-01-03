import { Collection } from '../../../common/types/movie';
import { VerticalPosterProps } from '../VerticalPoster/types';

type Omitted = 'mediaItem' | 'mediaType' | 'image' | 'rating' | 'title' | 'isFullWidth' | 'isLight';

export type CollectionVerticalPosterProps = Omit<VerticalPosterProps<'movie'>, Omitted> & {
	collection: Collection;
};
