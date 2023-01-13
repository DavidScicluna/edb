import { Episode } from '../../../../../../../../../common/types/tv';

export type TVShowEpisodeDateProps = Pick<Episode, 'air_date'> & {
	inView: boolean;
};
