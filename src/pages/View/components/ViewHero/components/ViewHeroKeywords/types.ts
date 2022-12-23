import { Keyword, MediaType } from '../../../../../../common/types';
import { ViewHeroLabelProps } from '../ViewHeroLabel/types';

export type ViewHeroKeywordsMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type ViewHeroKeywordsProps = Omit<ViewHeroLabelProps, 'label'> & {
	mediaType: ViewHeroKeywordsMediaType;
	keywords: Keyword[];
};
