import { PartialTV } from '../../../common/types/tv';
import { VerticalPosterProps } from '../VerticalPoster/types';

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

export type TVShowHorizontalPosterProps = Omit<VerticalPosterProps<'tv'>, Omitted> & {
	show: PartialTV;
};
