import { PartialPerson } from '../../../common/types/person';
import { VerticalPosterProps } from '../VerticalPoster/types';

type Omitted = 'mediaItem' | 'mediaType' | 'image' | 'rating' | 'title' | 'subtitle' | 'isFullWidth' | 'isLight';

export type PersonVerticalPosterProps = Omit<VerticalPosterProps<'tv'>, Omitted> & {
	person: PartialPerson;
};
