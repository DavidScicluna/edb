import { UseFormReturn } from 'react-hook-form';

import { SignInCommonProps } from '../../common/types';
import { Form } from '../../types';

export type FormProps = SignInCommonProps & {
	form: UseFormReturn<Form>;
	onSubmitAsGuest: () => void;
	onSubmit: (values: Form) => void;
};
