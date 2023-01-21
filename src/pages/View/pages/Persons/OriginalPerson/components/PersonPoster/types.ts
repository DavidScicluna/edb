import { FullPerson } from '../../../../../../../common/types/person';
import { ViewPosterProps } from '../../../../../components/ViewPoster/types';

export type PersonPosterProps = Omit<ViewPosterProps, 'alt' | 'src'> & {
	person?: FullPerson;
};
