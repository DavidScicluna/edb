import { MovieCrew } from '../../../../../../../../../common/types/movie';

export type OverviewTabKnownForProps = {
	person: MovieCrew;
	type: 'director' | 'actor' | 'writer';
	isCreditsFetching?: boolean;
	isCreditsLoading?: boolean;
	isCreditsError?: boolean;
	isCreditsSuccess?: boolean;
};
