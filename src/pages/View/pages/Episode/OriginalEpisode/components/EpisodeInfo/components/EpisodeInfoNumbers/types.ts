import { NoUndefinedField } from '@davidscicluna/component-library';

import { TVShowEpisode, FullTVShow } from '../../../../../../../../../common/types/tv';

export type EpisodeInfoNumbersProps = NoUndefinedField<Pick<TVShowEpisode, 'season_number' | 'episode_number'>> &
	Pick<FullTVShow, 'name'>;
