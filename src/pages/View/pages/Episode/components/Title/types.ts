import { Episode, FullTV } from '../../../../../../common/types/tv';

export type EpisodeTitleProps = {
	show?: FullTV;
	episode?: Episode;
	isLoading?: boolean;
};
