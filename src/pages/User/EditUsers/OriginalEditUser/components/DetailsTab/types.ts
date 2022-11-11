import { UseFormReturn } from 'react-hook-form';

import { EditUserCommonProps } from '../../common/types';
import { EditUserDetailsForm } from '../../types';

export type DetailsTabProps = EditUserCommonProps & {
	form: UseFormReturn<EditUserDetailsForm>;
	onSubmit: (values: EditUserDetailsForm) => void;
};
