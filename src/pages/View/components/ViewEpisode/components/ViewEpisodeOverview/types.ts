import { Episode } from '../../../../../../common/types/tv';

export type ViewEpisodeOverviewProps = Pick<Episode, 'overview'> & {
	inView: boolean;
};
