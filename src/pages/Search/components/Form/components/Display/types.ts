import { SearchType } from '../../../../../../store/slices/User/types';

type TotalResults = { [key in SearchType]: number };

export type DisplayProps = {
	query: string;
	searchTypes: SearchType[];
	totalResults?: TotalResults;
};
