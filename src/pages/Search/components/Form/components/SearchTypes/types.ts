import { SearchType } from '../../../../../../store/slices/User/types';

export type SearchTypesProps = {
	searchTypes: SearchType[];
	onSetSearchTypes: (searchTypes: SearchType[]) => void;
};
