import { Episode, EpisodeCredits } from '../../../../../../../../common/types/tv';

export type CastProps = {
	name?: Episode['name'];
	cast?: EpisodeCredits['cast'];
	isError?: boolean;
	isSuccess?: boolean;
	isLoading?: boolean;
	onChangeTab: () => void;
};
