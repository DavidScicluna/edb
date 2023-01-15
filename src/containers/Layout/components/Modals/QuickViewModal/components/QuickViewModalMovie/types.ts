import { NoUndefinedField } from '@davidscicluna/component-library';

import { FullMovie } from '../../../../../../../common/types/movie';

export type QuickViewModalMovieProps = NoUndefinedField<Pick<FullMovie, 'id'>>;
