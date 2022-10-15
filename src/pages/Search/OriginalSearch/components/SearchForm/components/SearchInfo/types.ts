import { UserSearchType } from '../../../../../../../store/slices/Users/types';

export type SearchInfoProps = {
	total: Record<UserSearchType, number>;
};
