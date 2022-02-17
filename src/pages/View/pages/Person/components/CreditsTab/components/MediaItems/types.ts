import {
	CastMovieCredit,
	CrewMovieCredit,
	CastTVCredit,
	CrewTVCredit
} from '../../../../../../../../common/types/person';

export type Movie = CastMovieCredit & CrewMovieCredit;

export type Show = CastTVCredit & CrewTVCredit;

export type Job = 'cast' | 'crew';

export type MediaItemsProps = {
	movies: Movie[];
	shows: Show[];
	label: string;
	job: Job;
};
