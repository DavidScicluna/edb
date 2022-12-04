import { FullPerson } from '../../../../../../../common/types/person';
import { PersonMovieDepartments, PersonTVShowDepartments } from '../../types';

export type PersonInfoProps = {
	person: FullPerson;
	movieDepartments: PersonMovieDepartments;
	tvShowDepartments: PersonTVShowDepartments;
};
