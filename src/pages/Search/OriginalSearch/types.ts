import { MediaType } from '../../../common/types';
import { UserSearchType } from '../../../store/slices/Users/types';

export type SearchForm = { query: string; searchTypes: UserSearchType[] };

export type SearchMediaType = MediaType;
export type SearchMediaTypes = SearchMediaType[];

export type SearchQueryDataStatus = 'empty' | 'multiple' | 'single' | 'hidden';
