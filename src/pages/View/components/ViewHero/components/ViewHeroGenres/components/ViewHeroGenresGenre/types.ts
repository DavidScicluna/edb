import { Genre } from '../../../../../../../../common/types';
import { ViewHeroGenresProps } from '../../types';

export type ViewHeroGenresGenreProps = Pick<ViewHeroGenresProps, 'mediaType'> & Genre;
