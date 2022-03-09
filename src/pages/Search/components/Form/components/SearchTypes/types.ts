import { SearchType } from '../../../../../../store/slices/Users/types';

export type SearchTypesProps = {
	searchTypes: SearchType[];
	onSetSearchTypes: (searchTypes: SearchType[]) => void;
};
