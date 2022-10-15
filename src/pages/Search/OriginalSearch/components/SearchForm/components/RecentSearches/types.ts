import { UserSearch } from '../../../../../../../store/slices/Users/types';

export type RecentSearchesProps = {
	onSearchClick: (props: Pick<UserSearch, 'label' | 'searchTypes'>) => void;
};
