import { MouseEvent as ME } from 'react';

import { FullTV } from '../../../../../../../common/types/tv';
import { ViewActionsProps } from '../../../../../components/ViewActions/types';

// TODO: Create a MouseEvent in IconButton in component lib and use that one ... go over
// All MouseEvents
export type TVShowActionsMouseEvent = ME<HTMLButtonElement, globalThis.MouseEvent>;

export type TVShowActionsProps = Omit<ViewActionsProps, 'children'> & {
	show: FullTV;
};
