import { useContext } from 'react';

import { SearchContext } from '../..';
import { SearchContext as SearchContextType } from '../../types';

const useSearchContext = (): SearchContextType => {
	const context = useContext<SearchContextType>(SearchContext);

	return { ...context };
};

export default useSearchContext;
