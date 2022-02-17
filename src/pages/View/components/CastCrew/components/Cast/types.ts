import { Accordion } from '../../../../../../components/Accordions/types';
import { CastCrewProps, Cast } from '../../types';

export type CastProps = Omit<CastCrewProps, 'credits'> & {
	cast?: Cast[];
} & Omit<Accordion<Cast[]>, 'id' | 'title' | 'subtitle' | 'total' | 'isDisabled' | 'data'>;
