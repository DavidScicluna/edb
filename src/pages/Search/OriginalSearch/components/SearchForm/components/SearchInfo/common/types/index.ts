import { UserSearchType } from '../../../../../../../../../store/slices/Users/types';

export type SearchInfosCommonProps = {
	total: Record<UserSearchType, number>;
};
