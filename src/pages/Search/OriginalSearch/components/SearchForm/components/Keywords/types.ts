import {
	UseKeywordsInfiniteQueryResponse,
	UseKeywordsInfiniteQueryResult
} from '../../../../../../../common/queries/useKeywordsInfiniteQuery';
import { Keyword } from '../../../../../../../common/types';
import { SearchListProps } from '../SearchList/types';

export type KeywordsProps = Pick<SearchListProps, 'onMouseEnter' | 'onMouseLeave'> & {
	query: UseKeywordsInfiniteQueryResult;
	keywords?: UseKeywordsInfiniteQueryResponse;
	onKeywordClick: (props: Pick<Keyword, 'name'>) => void;
};
