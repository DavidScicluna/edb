import { PartialTV } from '../../../common/types/tv';
import { HorizontalPosterProps } from '../HorizontalPoster/types';

type Omitted = 'mediaItem' | 'mediaType' | 'image' | 'rating' | 'title' | 'isFullWidth' | 'isLight';

export type TVShowHorizontalPosterProps = Omit<HorizontalPosterProps<'tv'>, Omitted> & {
	show: PartialTV;
};
