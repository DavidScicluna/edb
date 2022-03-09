import { SearchType } from '../../../../../../store/slices/Users/types';

type TotalResults = { [key in SearchType]: number };

export type DisplayProps = {
	query: string;
	searchTypes: SearchType[];
	totalResults?: TotalResults;
};
