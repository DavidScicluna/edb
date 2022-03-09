import { SearchType } from '../../../../../../../../store/slices/Users/types';

export type SearchTypesProps = {
	searchTypes: SearchType[];
	onClear?: () => void;
};
