import { useContext } from 'react';

import { CollectionContext } from '../..';
import { CollectionContext as CollectionContextType } from '../../types';

const useCollectionContext = (): CollectionContextType => {
	const context = useContext<CollectionContextType>(CollectionContext);

	return { ...context };
};

export default useCollectionContext;
