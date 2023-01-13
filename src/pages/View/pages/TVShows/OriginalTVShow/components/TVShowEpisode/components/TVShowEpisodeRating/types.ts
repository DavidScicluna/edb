import { Episode } from '../../../../../../../../../common/types/tv';

export type TVShowEpisodeRatingProps = Pick<Episode, 'vote_average' | 'vote_count'>;
