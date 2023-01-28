import { Episode } from '../../../../../../common/types/tv';

export type ViewEpisodeImageProps = Pick<Episode, 'id' | 'still_path' | 'name'> & {
	inView: boolean;
};
