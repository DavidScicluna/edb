import { Crew } from '../../../../../../../../../common/types/movie';

export type OverviewTabKnownForProps = {
	person: Crew;
	type: 'director' | 'actor' | 'writer';
	isCreditsFetching?: boolean;
	isCreditsLoading?: boolean;
	isCreditsError?: boolean;
	isCreditsSuccess?: boolean;
};
