import { PartialPerson } from '../../../common/types/person';
import { HorizontalPosterProps } from '../HorizontalPoster/types';

type Omitted = 'mediaItem' | 'mediaType' | 'image' | 'rating' | 'title' | 'isFullWidth' | 'isLight';

export type PersonHorizontalPosterProps = Omit<HorizontalPosterProps<'tv'>, Omitted> & {
	person: PartialPerson;
};
