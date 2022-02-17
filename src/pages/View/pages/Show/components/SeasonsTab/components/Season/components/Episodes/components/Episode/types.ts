import { Episode } from '../../../../../../../../../../../../common/types/tv';

export type EpisodeProps = {
	showId?: number;
	episode?: Episode;
	isLoading: boolean;
};
