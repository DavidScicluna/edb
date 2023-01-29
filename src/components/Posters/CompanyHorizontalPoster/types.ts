import { FullCompany } from '../../../common/types';
import { HorizontalPosterProps } from '../HorizontalPoster/types';

type Omitted = 'mediaItem' | 'mediaType' | 'image' | 'rating' | 'title' | 'isFullWidth' | 'isLight';

export type CompanyHorizontalPosterProps = Omit<HorizontalPosterProps<'movie'>, Omitted> & {
	company: FullCompany;
};
