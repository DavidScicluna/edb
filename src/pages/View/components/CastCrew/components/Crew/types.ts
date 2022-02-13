import { Accordion } from '../../../Accordions/types';
import { CastCrewProps, Crew } from '../../types';

export type CrewProps = Omit<CastCrewProps, 'credits'> & {
  crew?: Crew[];
} & Omit<Accordion<Crew[]>, 'id' | 'subtitle' | 'total' | 'isDisabled' | 'data'>;
