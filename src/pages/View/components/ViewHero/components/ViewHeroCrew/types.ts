import { MediaType } from '../../../../../../common/types';
import { Crew as TVShowCrew } from '../../../../../../common/types/tv';
import { Crew as MovieCrew } from '../../../../../../common/types/movie';
import { ViewHeroLabelProps } from '../ViewHeroLabel/types';

export type ViewHeroCrewMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type ViewHeroCrewGetMediaItemType<MT extends ViewHeroCrewMediaType> = MT extends 'movie'
	? Pick<MovieCrew, 'id' | 'name' | 'popularity'>
	: Pick<TVShowCrew, 'id' | 'name' | 'popularity'>;

export type ViewHeroCrewProps<MT extends ViewHeroCrewMediaType> = Pick<ViewHeroLabelProps, 'label'> & {
	crew?: ViewHeroCrewGetMediaItemType<MT>[];
};
