import { NoUndefinedField } from '@davidscicluna/component-library';

import { TVShowEpisode } from '../../../../../../../../../common/types/tv';

export type EpisodeInfoDateProps = NoUndefinedField<Pick<TVShowEpisode, 'air_date'>>;
