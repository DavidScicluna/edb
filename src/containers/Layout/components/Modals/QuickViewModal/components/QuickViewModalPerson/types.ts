import { NoUndefinedField } from '@davidscicluna/component-library';

import { FullPerson } from '../../../../../../../common/types/person';

export type QuickViewModalPersonProps = NoUndefinedField<Pick<FullPerson, 'id'>>;
