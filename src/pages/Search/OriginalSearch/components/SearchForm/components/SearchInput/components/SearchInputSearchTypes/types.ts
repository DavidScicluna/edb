import { UserSearchType } from '../../../../../../../../../store/slices/Users/types';

export type SearchInputSearchTypesProps = {
	searchTypes: UserSearchType[];
	onClear?: () => void;
};
