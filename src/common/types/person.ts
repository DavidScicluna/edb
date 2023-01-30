import { PartialMovie } from './movie';
import { PartialTVShow } from './tv';

import { MediaType } from '.';

export type PersonCastMovieCredit = {
	character?: string;
	credit_id?: string;
} & PartialMovie;

export type PersonCrewMovieCredit = {
	credit_id?: string;
	department?: string;
	job?: string;
} & PartialMovie;

export type PersonMovieCredits = {
	cast?: PersonCastMovieCredit[];
	crew?: PersonCrewMovieCredit[];
	id?: number;
};

export type PersonCastTVCredit = {
	character?: string;
	credit_id?: string;
} & PartialTVShow;

export type PersonCrewTVCredit = {
	department?: string;
	episode_count?: number;
	job?: string;
} & PartialTVShow;

export type PersonTVCredits = {
	cast?: PersonCastTVCredit[];
	crew?: PersonCrewTVCredit[];
	id?: number;
};

export type PersonCreditMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type PersonCredits = {
	cast?: ({ media_type?: PersonCreditMediaType } & (PersonCastMovieCredit & PersonCastTVCredit))[];
	crew?: ({ media_type?: PersonCreditMediaType } & (PersonCrewMovieCredit & PersonCrewTVCredit))[];
	id?: number;
};

type Person = {
	adult?: boolean;
	id?: number;
	name?: string;
	popularity?: number;
	profile_path?: string;
	known_for_department?: string;
};

export type PartialPerson = {
	known_for?: (PartialMovie & PartialTVShow)[];
} & Person;

/*
 * 0 = Not Specified
 * 1 = Female
 * 2 = Male
 * 3 = Non-Binary
 */
export type PersonGender = 0 | 1 | 2 | 3;

export type FullPerson = {
	also_known_as?: string[];
	biography?: string;
	birthday?: string | null;
	deathday?: string | null;
	gender?: PersonGender | null;
	homepage?: string | null;
	imdb_id?: string;
	place_of_birth?: string | null;
} & Person;
