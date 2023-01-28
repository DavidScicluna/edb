import { Episode } from '../../../../../../common/types/tv';

export type ViewEpisodeDateProps = Pick<Episode, 'air_date'> & {
	inView: boolean;
};
