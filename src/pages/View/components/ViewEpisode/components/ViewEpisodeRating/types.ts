import { Episode } from '../../../../../../common/types/tv';

export type ViewEpisodeRatingProps = Pick<Episode, 'vote_average' | 'vote_count'>;
