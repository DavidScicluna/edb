import { TVShowEpisode } from '../../../../../../../common/types/tv';
import { ViewPosterProps } from '../../../../../components/ViewPoster/types';

export type EpisodePosterProps = Omit<ViewPosterProps, 'alt' | 'src'> & {
	episode?: TVShowEpisode;
};
