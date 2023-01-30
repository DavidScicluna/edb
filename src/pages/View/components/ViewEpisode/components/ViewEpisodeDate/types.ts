import { TVShowEpisode } from '../../../../../../common/types/tv';

export type ViewEpisodeDateProps = Pick<TVShowEpisode, 'air_date'> & {
	inView: boolean;
};
