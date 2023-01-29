import { Episode } from '../../../../../../../common/types/tv';
import { ViewActionsProps } from '../../../../../components/ViewActions/types';

export type EpisodeActionsProps = Omit<ViewActionsProps, 'children'> & {
	episode: Episode;
};
