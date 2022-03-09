import { Search, SearchType } from '../../../../../../store/slices/Users/types';

export type RecentSearchesProps = {
	onSearchClick: (label: Search['label'], searchTypes?: SearchType[]) => void;
};
