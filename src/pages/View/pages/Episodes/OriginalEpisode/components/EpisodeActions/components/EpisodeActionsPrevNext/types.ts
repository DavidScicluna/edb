import { NoUndefinedField } from '@davidscicluna/component-library';

import { Episode } from '../../../../../../../../../common/types/tv';

export type EpisodeActionsPrevNextProps = NoUndefinedField<Pick<Episode, 'season_number' | 'episode_number'>> & {
	type: 'prev' | 'next';
};
