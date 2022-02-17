import { FullSeason } from '../../../../../../../../../../common/types/tv';

export type EpisodesProps = {
	showId?: number;
	title?: string;
	episodes?: FullSeason['episodes'];
	isLoading?: boolean;
	isError?: boolean;
	isSuccess?: boolean;
};
