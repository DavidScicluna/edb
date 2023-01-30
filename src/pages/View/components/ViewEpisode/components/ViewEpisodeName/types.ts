import { TVShowEpisode } from '../../../../../../common/types/tv';

export type ViewEpisodeNameProps = Pick<TVShowEpisode, 'name'> & {
	inView: boolean;
};
