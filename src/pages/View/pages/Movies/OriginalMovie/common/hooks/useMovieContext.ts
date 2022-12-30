import { useContext } from 'react';

import { MovieContext } from '../..';
import { MovieContext as MovieContextType } from '../../types';

const useMovieContext = (): MovieContextType => {
	const context = useContext<MovieContextType>(MovieContext);

	return { ...context };
};

export default useMovieContext;
