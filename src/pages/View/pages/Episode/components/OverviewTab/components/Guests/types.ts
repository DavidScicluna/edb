import { Episode, EpisodeCredits } from '../../../../../../../../common/types/tv';

export type GuestsProps = {
	name?: Episode['name'];
	guests?: EpisodeCredits['guest_stars'];
	isError?: boolean;
	isSuccess?: boolean;
	isLoading?: boolean;
	onChangeTab: () => void;
};
