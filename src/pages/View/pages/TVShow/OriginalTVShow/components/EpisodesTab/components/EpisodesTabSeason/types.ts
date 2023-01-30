import { NoUndefinedField } from '@davidscicluna/component-library';

import { TVShowFullSeason, FullTVShow } from '../../../../../../../../../common/types/tv';

export type EpisodesTabSeasonProps = NoUndefinedField<Pick<FullTVShow, 'id'> & { season: TVShowFullSeason['id'] }>;
