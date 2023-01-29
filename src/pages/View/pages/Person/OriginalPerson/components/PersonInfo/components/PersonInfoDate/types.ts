import { NoUndefinedField } from '@davidscicluna/component-library';

import { FullPerson } from '../../../../../../../../../common/types/person';

export type PersonInfoDateProps = NoUndefinedField<Pick<FullPerson, 'birthday'>> &
	Pick<FullPerson, 'deathday' | 'place_of_birth'>;
