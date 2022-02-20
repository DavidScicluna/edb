import { PartialSeason } from '../../../../../../../../common/types/tv';
import { Accordion } from '../../../../../../../../components/Accordions/types';

export type SeasonProps = {
	showId?: number;
	season?: PartialSeason;
	isOpen: boolean;
} & Omit<Accordion<PartialSeason>, 'subtitle' | 'total' | 'isDisabled' | 'data'>;
