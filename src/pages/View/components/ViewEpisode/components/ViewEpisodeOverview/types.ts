import { TVShowEpisode } from '../../../../../../common/types/tv';

export type ViewEpisodeOverviewProps = Pick<TVShowEpisode, 'overview'> & {
	inView: boolean;
};
