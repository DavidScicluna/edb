import { Crew } from '../../../../../../../../../common/types/movie';

export type OverviewTabKnownForProps = {
	person: Crew;
	type: 'creator' | 'actor';
	isCreditsFetching?: boolean;
	isCreditsLoading?: boolean;
	isCreditsError?: boolean;
	isCreditsSuccess?: boolean;
};
