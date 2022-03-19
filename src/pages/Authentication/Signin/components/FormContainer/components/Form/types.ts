import { UseFormReturn } from 'react-hook-form';

import { Form } from '../../types';

export type FormProps = {
	form: UseFormReturn<Form>;
	onSubmit: (values: Form) => void;
	onChange: () => void;
};
