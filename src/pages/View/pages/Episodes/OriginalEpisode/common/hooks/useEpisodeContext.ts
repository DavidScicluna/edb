import { useContext } from 'react';

import { EpisodeContext } from '../..';
import { EpisodeContext as EpisodeContextType } from '../../types';

const useEpisodeContext = (): EpisodeContextType => {
	const context = useContext<EpisodeContextType>(EpisodeContext);

	return { ...context };
};

export default useEpisodeContext;
