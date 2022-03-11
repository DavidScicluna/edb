import { FullTV, Episode } from '../../../../../../../../common/types/tv';
import { RenderProps } from '../../../../../../components/Title/types';

export type ShowProps = {
	name: FullTV['name'];
	season: Episode['season_number'];
	episode: Episode['episode_number'];
	isLoading: boolean;
} & Omit<RenderProps, 'color' | 'fontWeight' | 'lineHeight'>;
