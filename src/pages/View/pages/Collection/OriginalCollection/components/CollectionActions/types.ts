import { MouseEvent as ME } from 'react';

import { Collection } from '../../../../../../../common/types/movie';
import { ViewActionsProps } from '../../../../../components/ViewActions/types';

export type CollectionActionsMouseEvent = ME<HTMLButtonElement, globalThis.MouseEvent>;

export type CollectionActionsProps = Omit<ViewActionsProps, 'children'> & {
	collection: Collection;
};
