import { MouseEvent as ME } from 'react';

import { FullMovie } from '../../../../../../../common/types/movie';
import { ViewActionsProps } from '../../../../../components/ViewActions/types';

export type MovieActionsMouseEvent = ME<HTMLButtonElement, globalThis.MouseEvent>;

export type MovieActionsProps = Omit<ViewActionsProps, 'children'> & {
	movie: FullMovie;
};
