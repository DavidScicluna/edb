import { AccordionType } from '@davidscicluna/component-library';

import { PartialSeason } from '../../../../../../../../common/types/tv';

export type SeasonProps = {
	showId?: number;
	season?: PartialSeason;
} & Omit<AccordionType<PartialSeason>, 'subtitle' | 'total' | 'isDisabled' | 'data'>;
