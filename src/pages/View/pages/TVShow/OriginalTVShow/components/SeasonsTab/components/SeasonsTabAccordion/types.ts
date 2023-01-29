import { AccordionType } from '@davidscicluna/component-library';

import { PartialSeason } from '../../../../../../../../../common/types/tv';

export type SeasonsTabAccordionProps = Omit<AccordionType<PartialSeason>, 'data'> & {
	season: PartialSeason;
	isOpen?: boolean;
};
