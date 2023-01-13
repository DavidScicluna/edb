import { NoUndefinedField } from '@davidscicluna/component-library';

import { FullSeason, FullTV } from '../../../../../../../../../common/types/tv';

export type EpisodesTabSeasonProps = NoUndefinedField<Pick<FullTV, 'id'> & { season: FullSeason['id'] }>;
