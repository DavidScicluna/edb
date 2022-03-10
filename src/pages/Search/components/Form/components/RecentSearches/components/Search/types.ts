import { Search, SearchType } from '../../../../../../../../store/slices/Users/types';

export type SearchProps = {
	isDisabled: boolean;
	onDelete: (id: Search['id']) => void;
	onClick: (label: Search['label'], searchTypes?: SearchType[]) => void;
} & Search;
