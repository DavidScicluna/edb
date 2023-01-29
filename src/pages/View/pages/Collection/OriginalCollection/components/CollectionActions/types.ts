import { Collection } from '../../../../../../../common/types/movie';
import { ViewActionsProps } from '../../../../../components/ViewActions/types';

export type CollectionActionsProps = Omit<ViewActionsProps, 'children'> & {
	collection: Collection;
};
