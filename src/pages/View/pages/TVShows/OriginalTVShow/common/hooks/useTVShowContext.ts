import { useContext } from 'react';

import { TVShowContext } from '../..';
import { TVShowContext as TVShowContextType } from '../../types';

const useTVShowContext = (): TVShowContextType => {
	const context = useContext<TVShowContextType>(TVShowContext);

	return { ...context };
};

export default useTVShowContext;
