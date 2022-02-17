import { Search, SearchType } from '../../../../../../store/slices/User/types';

export type RecentSearchesProps = {
	onSearchClick: (label: Search['label'], searchTypes?: SearchType[]) => void;
};
