import { Collection } from '../../../common/types/movie';
import { HorizontalPosterProps } from '../HorizontalPoster/types';

type Omitted = 'mediaItem' | 'mediaType' | 'image' | 'rating' | 'title' | 'isFullWidth' | 'isLight';

export type CollectionHorizontalPosterProps = Omit<HorizontalPosterProps<'movie'>, Omitted> & {
	collection: Collection;
};
