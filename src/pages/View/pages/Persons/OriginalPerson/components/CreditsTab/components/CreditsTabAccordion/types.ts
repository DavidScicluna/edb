import { AccordionType } from '@davidscicluna/component-library';

import { PersonCredit, PersonDepartment, PersonMediaType } from '../../../../types';

export type CreditsTabAccordionProps<Cast extends PersonCredit, Crew extends PersonCredit> = Omit<
	AccordionType<PersonDepartment<Cast, Crew>>,
	'data'
> & {
	mediaType: PersonMediaType;
	credits: PersonDepartment<Cast, Crew>['credits'];
	isOpen?: boolean;
};
