import { MouseEvent as ME } from 'react';

import { FullPerson } from '../../../../../../../common/types/person';
import { ViewActionsProps } from '../../../../../components/ViewActions/types';

export type PersonActionsMouseEvent = ME<HTMLButtonElement, globalThis.MouseEvent>;

export type PersonActionsProps = Omit<ViewActionsProps, 'children'> & {
	person: FullPerson;
};
