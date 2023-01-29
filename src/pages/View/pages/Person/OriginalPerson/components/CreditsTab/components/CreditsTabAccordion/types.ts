import { AccordionType } from '@davidscicluna/component-library';

import { MediaType } from '../../../../../../../../../common/types';
import { PersonCredit, PersonDepartment } from '../../../../types';

export type CreditsTabMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type CreditsTabAccordionProps<Cast extends PersonCredit, Crew extends PersonCredit> = Omit<
	AccordionType<PersonDepartment<Cast, Crew>>,
	'data'
> & {
	mediaType: CreditsTabMediaType;
	credits: PersonDepartment<Cast, Crew>['credits'];
	isOpen?: boolean;
};
