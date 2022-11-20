import { MediaType, Genre, Certification } from '../../common/types';

export type FiltersMediaType = Exclude<MediaType, 'person' | 'collection' | 'company'>;

export type FiltersFormGenre = Genre['id'];
export type FiltersFormGenres = FiltersFormGenre[];

export type FiltersFormCertification = Certification['certification'];
export type FiltersFormCertifications = FiltersFormCertification[];

export type FiltersFormDate = string | null;
export type FiltersFormDates = { gte: FiltersFormDate; lte: FiltersFormDate };

export type FiltersFormNumber = number | null;
export type FiltersFormNumbers = FiltersFormNumber[];

export type FiltersForm = {
	dates: FiltersFormDates;
	genres: FiltersFormGenres;
	certifications: FiltersFormCertifications;
	rating: FiltersFormNumbers;
	count: FiltersFormNumbers;
	runtime: FiltersFormNumbers;
};
