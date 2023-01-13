import { CardProps } from '@davidscicluna/component-library';

import { Episode } from '../../../../../../../common/types/tv';

export type TVShowEpisodeProps = Omit<CardProps, 'children'> & {
	episode: Episode;
	badgeLabel?: string;
};
