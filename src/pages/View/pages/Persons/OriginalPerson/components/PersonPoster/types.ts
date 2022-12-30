import { FullPerson } from '../../../../../../../common/types/person';
import { ViewPosterProps } from '../../../../../components/ViewPoster/types';

export type PersonPosterProps = Pick<ViewPosterProps, 'onClick'> & {
	person: FullPerson;
};
