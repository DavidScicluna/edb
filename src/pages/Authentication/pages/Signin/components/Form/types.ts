import { UseFormReturn } from 'react-hook-form';

import { Form } from '../../types';

export type FormProps = {
	form: UseFormReturn<Form>;
	onSubmitAsGuest: () => void;
	onSubmit: (values: Form) => void;
};
