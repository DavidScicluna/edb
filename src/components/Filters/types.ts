import { Genre, Certification } from '../../common/types';

type FormDate = string | null;

type FormNumber = number | null;

export type Filters = {
	date: { gte: FormDate; lte: FormDate };
	genres: Genre['id'][];
	certifications: Certification['certification'][];
	rating: FormNumber[];
	count: FormNumber[];
	runtime: FormNumber[];
	adult: boolean;
};
