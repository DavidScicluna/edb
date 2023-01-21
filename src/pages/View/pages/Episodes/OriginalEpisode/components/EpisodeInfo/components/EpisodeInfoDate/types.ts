import { NoUndefinedField } from '@davidscicluna/component-library';

import { Episode } from '../../../../../../../../../common/types/tv';

export type EpisodeInfoDateProps = NoUndefinedField<Pick<Episode, 'air_date'>>;
