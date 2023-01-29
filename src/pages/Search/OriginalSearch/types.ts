import { TabsOnChangeProps } from '@davidscicluna/component-library';

import { UserSearchType } from '../../../store/slices/Users/types';

export type SearchForm = { query: string; searchTypes: UserSearchType[] };

export type SearchQueryDataStatus = 'empty' | 'multiple' | 'single' | 'hidden';

export type SearchContext = SearchForm & {
	onSetActiveTab: (props: TabsOnChangeProps) => void;
};
