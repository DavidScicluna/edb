import { NoUndefinedField } from '@davidscicluna/component-library';

import { FullMovie } from '../../../../../../../../../common/types/movie';

export type MovieInfoRuntimeProps = NoUndefinedField<Pick<FullMovie, 'runtime'>>;
