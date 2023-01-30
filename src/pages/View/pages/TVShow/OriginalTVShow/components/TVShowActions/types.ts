import { FullTVShow } from '../../../../../../../common/types/tv';
import { ViewActionsProps } from '../../../../../components/ViewActions/types';

export type TVShowActionsProps = Omit<ViewActionsProps, 'children'> & {
	show: FullTVShow;
};
