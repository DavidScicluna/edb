import { CastMovieCredit, CrewMovieCredit, CastTVCredit, CrewTVCredit } from '../../../../common/types/person';

export type Department = {
	id: string;
	label: string;
	credits: {
		cast?: {
			movie?: CastMovieCredit[];
			tv?: CastTVCredit[];
		};
		crew?: {
			movie?: CrewMovieCredit[];
			tv?: CrewTVCredit[];
		};
	};
};
