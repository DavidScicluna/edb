import { TabsProps } from '@davidscicluna/component-library';

import { UseSearchInfiniteQueryResponse } from '../../../../../common/queries/useSearchInfiniteQuery';

export type SearchTabsProps = Pick<TabsProps, 'activeTab' | 'onChange'> & {
	movies?: UseSearchInfiniteQueryResponse<'movie'>;
	shows?: UseSearchInfiniteQueryResponse<'tv'>;
	people?: UseSearchInfiniteQueryResponse<'person'>;
	companies?: UseSearchInfiniteQueryResponse<'company'>;
	collections?: UseSearchInfiniteQueryResponse<'collection'>;
};
