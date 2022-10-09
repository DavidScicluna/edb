import {
	UseKeywordsInfiniteQueryResponse,
	UseKeywordsInfiniteQueryResult
} from '../../../../../../../common/queries/useKeywordsInfiniteQuery';
import { Keyword } from '../../../../../../../common/types';

export type KeywordsProps = {
	query: UseKeywordsInfiniteQueryResult;
	keywords?: UseKeywordsInfiniteQueryResponse;
	onKeywordClick: (props: Pick<Keyword, 'name'>) => void;
};
