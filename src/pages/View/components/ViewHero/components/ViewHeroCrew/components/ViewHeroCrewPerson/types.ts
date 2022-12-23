import { ViewHeroCrewMediaType, ViewHeroCrewGetMediaItemType } from '../../types';

export type ViewHeroCrewPersonProps<MT extends ViewHeroCrewMediaType> = ViewHeroCrewGetMediaItemType<MT>;
