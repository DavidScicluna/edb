import { Episode } from '../../../../../../../../../common/types/tv';

export type TVShowEpisodeNameProps = Pick<Episode, 'name'> & {
	inView: boolean;
};
