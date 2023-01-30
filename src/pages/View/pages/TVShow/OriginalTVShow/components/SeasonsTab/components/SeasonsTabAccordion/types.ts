import { AccordionType } from '@davidscicluna/component-library';

import { TVShowPartialSeason } from '../../../../../../../../../common/types/tv';

export type SeasonsTabAccordionProps = Omit<AccordionType<TVShowPartialSeason>, 'data'> & {
	season: TVShowPartialSeason;
	isOpen?: boolean;
};
