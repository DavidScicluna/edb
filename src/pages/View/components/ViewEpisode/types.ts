import { CardProps } from '@davidscicluna/component-library';

import { TVShowEpisode } from '../../../../common/types/tv';

export type ViewEpisodeProps = Omit<CardProps, 'children'> & {
	episode: TVShowEpisode;
	badgeLabel?: string;
};
