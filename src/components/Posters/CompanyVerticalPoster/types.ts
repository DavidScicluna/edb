import { PartialCompany } from '../../../common/types';
import { VerticalPosterProps } from '../VerticalPoster/types';

type Omitted = 'mediaItem' | 'mediaType' | 'image' | 'rating' | 'title' | 'isFullWidth' | 'isLight';

export type CompanyVerticalPosterProps = Omit<VerticalPosterProps<'movie'>, Omitted> & {
	company: PartialCompany;
};
