import { NoUndefinedField } from '@davidscicluna/component-library';

import { Episode, FullTV } from '../../../../../../../../../common/types/tv';

export type EpisodeInfoNumbersProps = NoUndefinedField<Pick<Episode, 'season_number' | 'episode_number'>> &
	Pick<FullTV, 'name'>;
