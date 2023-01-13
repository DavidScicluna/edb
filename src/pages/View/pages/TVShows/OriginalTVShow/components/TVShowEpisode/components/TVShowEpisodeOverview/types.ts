import { Episode } from '../../../../../../../../../common/types/tv';

export type TVShowEpisodeOverviewProps = Pick<Episode, 'overview'> & {
	inView: boolean;
};
