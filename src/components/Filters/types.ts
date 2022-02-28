import { MediaType, Genre, Certification } from '../../common/types';

export type FiltersMediaTypes = Omit<MediaType, 'person' | 'collection' | 'company'>;

type FormDate = string | null;

type FormNumber = number | null;

export type Filters = {
	dates: { gte: FormDate; lte: FormDate };
	genres: Genre['id'][];
	certifications: Certification['certification'][];
	rating: FormNumber[];
	count: FormNumber[];
	runtime: FormNumber[];
};
