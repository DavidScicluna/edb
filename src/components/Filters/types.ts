import { Nullable } from '@davidscicluna/component-library';

import { MediaType, Genre, Certification, Keyword } from '../../common/types';

export type FiltersMediaType = Exclude<MediaType, 'person' | 'collection' | 'company'>;

export type FiltersFormGenre = Genre['id'];
export type FiltersFormGenres = FiltersFormGenre[];

export type FiltersFormCertification = Certification['certification'];
export type FiltersFormCertifications = FiltersFormCertification[];

export type FiltersFormDate = Nullable<string>;
export type FiltersFormDates = { gte: FiltersFormDate; lte: FiltersFormDate };

export type FiltersFormNumber = Nullable<number>;
export type FiltersFormNumbers = FiltersFormNumber[];

export type FiltersFormKeyword = Keyword['id'];
export type FiltersFormKeywords = FiltersFormKeyword[];

export type FiltersForm = {
	dates: FiltersFormDates;
	genres: FiltersFormGenres;
	certifications: FiltersFormCertifications;
	rating: FiltersFormNumbers;
	count: FiltersFormNumbers;
	runtime: FiltersFormNumbers;
	keywords: FiltersFormKeywords;
};
