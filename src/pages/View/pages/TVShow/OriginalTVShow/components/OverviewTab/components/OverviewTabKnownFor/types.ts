import { MovieCrew } from '../../../../../../../../../common/types/movie';

export type OverviewTabKnownForProps = {
	person: MovieCrew;
	type: 'creator' | 'actor';
	isCreditsFetching?: boolean;
	isCreditsLoading?: boolean;
	isCreditsError?: boolean;
	isCreditsSuccess?: boolean;
};
