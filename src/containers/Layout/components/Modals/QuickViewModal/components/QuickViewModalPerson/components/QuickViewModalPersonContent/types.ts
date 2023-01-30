import { PersonMovieCredits, PersonTVCredits } from '../../../../../../../../../common/types/person';
import { CommonQuickViewModalPersonProps } from '../../common/types';
import {
	PersonMovieDepartments,
	PersonTVShowDepartments
} from '../../../../../../../../../pages/View/pages/Person/OriginalPerson/types';

export type QuickViewModalPersonContentProps = CommonQuickViewModalPersonProps & {
	movieCredits?: PersonMovieCredits;
	movieDepartments?: PersonMovieDepartments;
	tvShowCredits?: PersonTVCredits;
	tvShowDepartments?: PersonTVShowDepartments;
};
