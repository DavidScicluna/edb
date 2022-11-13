import { UseFormReturn } from 'react-hook-form';

import { SigninForm } from '../../types';

export type SigninFormProps = {
	form: UseFormReturn<SigninForm>;
	onSubmitAsGuest: () => void;
	onSubmit: (values: SigninForm) => void;
};
