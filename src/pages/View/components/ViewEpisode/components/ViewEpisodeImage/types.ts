import { TVShowEpisode } from '../../../../../../common/types/tv';

export type ViewEpisodeImageProps = Pick<TVShowEpisode, 'id' | 'still_path' | 'name'> & {
	inView: boolean;
};
