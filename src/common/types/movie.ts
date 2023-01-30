import { FullPerson } from './person';

import { ProductionCompany, ProductionCountry, Genre, Language } from '.';

export type MovieCast = {
	cast_id?: number;
	character?: string;
	credit_id?: string;
	order?: number;
	original_name?: string;
} & FullPerson;

export type MovieCrew = {
	credit_id?: string;
	department?: string;
	job?: string;
	original_name?: string;
} & FullPerson;

export type MovieCredits = {
	cast?: MovieCast[];
	crew?: MovieCrew[];
	id?: number;
};

type Movie = {
	adult?: boolean;
	backdrop_path?: string | null;
	id?: number;
	original_language?: string;
	original_title?: string;
	overview?: string;
	popularity?: number;
	poster_path?: string | null;
	release_date?: string;
	title?: string;
	video?: boolean;
	vote_count?: number;
	vote_average?: number;
};

export type PartialMovie = {
	genre_ids?: number[];
} & Movie;

export type MovieReleaseDate = {
	certification?: string;
	iso_639_1?: string;
	note?: string;
	release_date?: string;
	type?: number;
};

export type MovieReleaseDatesResults = {
	iso_3166_1?: string;
	release_dates?: MovieReleaseDate[];
};

type ReleaseDates = {
	results?: MovieReleaseDatesResults[];
};

export type MovieStatus = 'Canceled' | 'In Production' | 'Planned' | 'Post Production' | 'Released' | 'Rumored';

export type Collection = {
	backdrop_path?: string | null;
	id?: number;
	name?: string;
	overview?: string;
	parts?: PartialMovie[];
	poster_path?: string | null;
};

export type FullMovie = {
	belongs_to_collection?: Omit<Collection, 'overview' | 'parts'>;
	budget?: number;
	genres?: Genre[];
	homepage?: string | null;
	imdb_id?: string | null;
	production_companies?: ProductionCompany[];
	production_countries?: ProductionCountry[];
	release_dates?: ReleaseDates;
	revenue?: number;
	runtime?: number | null;
	spoken_languages?: Language[];
	status?: MovieStatus;
	tagline?: string | null;
} & Movie;

// TODO: Create PartialMovies type and replace all PartialMovie[] with PartialMovies
// TODO: Do the same for tv and people
