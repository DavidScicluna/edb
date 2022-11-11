import { UseFormReturn } from 'react-hook-form';

import { EditUserCommonProps } from '../../common/types';
import { EditUserPasswordForm } from '../../types';

export type PasswordTabProps = EditUserCommonProps & {
	form: UseFormReturn<EditUserPasswordForm>;
	onSubmit: (values: EditUserPasswordForm) => void;
};
