import { Episode } from '../../../../../../common/types/tv';

export type ViewEpisodeNameProps = Pick<Episode, 'name'> & {
	inView: boolean;
};
