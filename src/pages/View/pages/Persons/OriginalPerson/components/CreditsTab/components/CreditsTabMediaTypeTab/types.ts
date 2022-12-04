import { UsePersonMovieCreditsQueryResult } from '../../../../../../../../../common/queries/usePersonMovieCreditsQuery';
import { UsePersonTVShowCreditsQueryResult } from '../../../../../../../../../common/queries/usePersonTVShowCreditsQuery';
import { PersonCredit, PersonDepartments, PersonMediaType } from '../../../../types';

export type CreditsTabMediaTypeTabQuery = UsePersonMovieCreditsQueryResult | UsePersonTVShowCreditsQueryResult;

export type CreditsTabMediaTypeTabProps<
	Cast extends PersonCredit,
	Crew extends PersonCredit,
	Query extends CreditsTabMediaTypeTabQuery
> = {
	mediaType: PersonMediaType;
	departments: PersonDepartments<Cast, Crew>;
	query?: Query;
	// isLoading?: boolean;
	// isError?: boolean;
	// isSuccess?: boolean;
	// error: QueryError;
	// refetch: () => void;
};
