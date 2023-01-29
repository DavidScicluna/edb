import { FullMovie } from '../../../../../../../common/types/movie';
import { ViewActionsProps } from '../../../../../components/ViewActions/types';

export type MovieActionsProps = Omit<ViewActionsProps, 'children'> & {
	movie: FullMovie;
};
