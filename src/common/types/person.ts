import { PartialMovie } from './movie';
import { PartialTV } from './tv';

export type CastMovieCredit = {
	character?: string;
	credit_id?: string;
} & PartialMovie;

export type CrewMovieCredit = {
	credit_id?: string;
	department?: string;
	job?: string;
} & PartialMovie;

export type MovieCredits = {
	cast?: CastMovieCredit[];
	crew?: CrewMovieCredit[];
	id?: number;
};

export type CastTVCredit = {
	character?: string;
	credit_id?: string;
} & PartialTV;

export type CrewTVCredit = {
	department?: string;
	episode_count?: number;
	job?: string;
} & PartialTV;

export type TVCredits = {
	cast?: CastTVCredit[];
	crew?: CrewTVCredit[];
	id?: number;
};

export type Credits = {
	cast?: (CastMovieCredit & CastTVCredit)[];
	crew?: (CrewMovieCredit & CrewTVCredit)[];
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
	known_for?: (PartialMovie & PartialTV)[];
} & Person;

type Gender = 0 | 1 | 2 | 3;

export type FullPerson = {
	also_known_as?: string[];
	biography?: string;
	birthday?: string | null;
	deathday?: string | null;
	gender?: Gender | null;
	homepage?: string | null;
	imdb_id?: string;
	place_of_birth?: string | null;
} & Person;
