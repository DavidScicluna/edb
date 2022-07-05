import { AccordionType } from '@davidscicluna/component-library';

import { CastCrewProps, Crew } from '../../types';

export type CrewProps = Omit<CastCrewProps, 'credits'> & {
	crew?: Crew[];
} & Omit<AccordionType<Crew[]>, 'id' | 'subtitle' | 'total' | 'isDisabled' | 'data'>;
