import { FiltersFormGenres } from '../../../types';
import { CommonDisplayFiltersProps } from '../../common/types';
import { DisplayFiltersProps } from '../../types';

export type GenresProps = CommonDisplayFiltersProps & {
	genres: FiltersFormGenres;
} & Pick<DisplayFiltersProps, 'mediaType'>;
