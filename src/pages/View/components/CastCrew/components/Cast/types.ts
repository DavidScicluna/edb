import { AccordionType } from '@davidscicluna/component-library';

import { CastCrewProps, Cast } from '../../types';

export type CastProps = Omit<CastCrewProps, 'credits'> & {
	cast?: Cast[];
} & Omit<AccordionType<Cast[]>, 'id' | 'title' | 'subtitle' | 'total' | 'isDisabled' | 'data'>;
