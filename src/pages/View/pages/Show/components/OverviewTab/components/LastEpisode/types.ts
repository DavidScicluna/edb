import { FullTV } from '../../../../../../../../common/types/tv';

export type LastEpisodeProps = {
	show?: FullTV;
	isLoading?: boolean;
	onChangeTab: () => void;
};
