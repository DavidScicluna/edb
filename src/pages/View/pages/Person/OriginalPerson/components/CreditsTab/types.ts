import { PersonMovieDepartments, PersonTVShowDepartments } from '../../types';

export type CreditsTabProps = {
	movieDepartments: PersonMovieDepartments;
	tvShowDepartments: PersonTVShowDepartments;
	total: number;
};
