import { MovieCredits, TVCredits } from '../../../../../../../../../common/types/person';
import { CommonQuickViewModalPersonProps } from '../../common/types';
import {
	PersonMovieDepartments,
	PersonTVShowDepartments
} from '../../../../../../../../../pages/View/pages/Person/OriginalPerson/types';

export type QuickViewModalPersonContentProps = CommonQuickViewModalPersonProps & {
	movieCredits?: MovieCredits;
	movieDepartments?: PersonMovieDepartments;
	tvShowCredits?: TVCredits;
	tvShowDepartments?: PersonTVShowDepartments;
};
