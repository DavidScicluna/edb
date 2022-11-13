import { UseFormReturn } from 'react-hook-form';

import { ResetPasswordForm } from '../../types';

export type ResetPasswordFormProps = {
	form: UseFormReturn<ResetPasswordForm>;
	onSubmit: (values: ResetPasswordForm) => void;
	onBack: () => void;
};
