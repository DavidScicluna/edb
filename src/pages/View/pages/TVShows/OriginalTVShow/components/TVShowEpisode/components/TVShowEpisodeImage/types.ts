import { Episode } from '../../../../../../../../../common/types/tv';

export type TVShowEpisodeImageProps = Pick<Episode, 'id' | 'still_path' | 'name'> & {
	inView: boolean;
};
