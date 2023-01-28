import { CardProps } from '@davidscicluna/component-library';

import { Episode } from '../../../../common/types/tv';

export type ViewEpisodeProps = Omit<CardProps, 'children'> & {
	episode: Episode;
	badgeLabel?: string;
};
