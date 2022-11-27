import { PartialTV } from '../../../common/types/tv';
import { VerticalPosterProps } from '../VerticalPoster/types';

type Omitted = 'mediaItem' | 'mediaType' | 'image' | 'rating' | 'title' | 'isFullWidth' | 'isLight';

export type TVShowVerticalPosterProps = Omit<VerticalPosterProps<'tv'>, Omitted> & {
	show: PartialTV;
};
