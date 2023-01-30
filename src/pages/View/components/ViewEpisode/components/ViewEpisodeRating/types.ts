import { TVShowEpisode } from '../../../../../../common/types/tv';

export type ViewEpisodeRatingProps = Pick<TVShowEpisode, 'vote_average' | 'vote_count'>;
