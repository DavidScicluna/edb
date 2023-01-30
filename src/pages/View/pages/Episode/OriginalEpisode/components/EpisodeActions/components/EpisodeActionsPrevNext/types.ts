import { NoUndefinedField } from '@davidscicluna/component-library';

import { TVShowEpisode } from '../../../../../../../../../common/types/tv';

export type EpisodeActionsPrevNextProps = NoUndefinedField<Pick<TVShowEpisode, 'season_number' | 'episode_number'>> & {
	type: 'prev' | 'next';
};
