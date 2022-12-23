import { Genre, MediaType } from '../../../../../../common/types';
import { ViewHeroLabelProps } from '../ViewHeroLabel/types';

export type ViewHeroGenresMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type ViewHeroGenresProps = Omit<ViewHeroLabelProps, 'label'> & {
	mediaType: ViewHeroGenresMediaType;
	genres: Genre[];
};
