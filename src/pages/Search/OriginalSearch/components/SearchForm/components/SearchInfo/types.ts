import { UserSearchType } from '../../../../../../../store/slices/Users/types';

export type SearchInfoProps = {
	watchQuery: string;
	watchSearchTypes: UserSearchType[];
	total: Record<UserSearchType, number>;
};
