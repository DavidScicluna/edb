import { UsePersonCreditsQueryResult } from '../../../../../../../../../common/queries/usePersonCreditsQuery';
import { PersonCredit, PersonDepartments } from '../../../../types';

export type CreditsTabMediaTypeTabQuery = UsePersonCreditsQueryResult<'movie'> & UsePersonCreditsQueryResult<'tv'>;

export type CreditsTabMediaTypeTabProps<
	Cast extends PersonCredit,
	Crew extends PersonCredit,
	Query extends CreditsTabMediaTypeTabQuery
> = {
	mediaType: CreditsTabMediaTypeTabQuery;
	departments: PersonDepartments<Cast, Crew>;
	query?: Query;
};
