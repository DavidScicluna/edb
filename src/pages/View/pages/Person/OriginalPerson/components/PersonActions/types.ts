import { FullPerson } from '../../../../../../../common/types/person';
import { ViewActionsProps } from '../../../../../components/ViewActions/types';

export type PersonActionsProps = Omit<ViewActionsProps, 'children'> & {
	person: FullPerson;
};
