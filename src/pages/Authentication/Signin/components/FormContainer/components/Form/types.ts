import { UseFormReturn } from 'react-hook-form';

import { User, Credentials } from '../../../../../../../store/slices/Users/types';
import { Form } from '../../types';

export type FormProps = {
	form: UseFormReturn<Form>;
	users: User[];
	onSubmit: (values: Form) => void;
	onChange: () => void;
	onUserClick: (credentials?: Credentials) => void;
};
