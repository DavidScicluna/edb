import { InputProps } from '@chakra-ui/react';

import { UseFormReturn } from 'react-hook-form';

import { Form } from '../../../../types';

export type SearchInputProps = Pick<InputProps, 'onFocus' | 'onBlur'> & {
	form: UseFormReturn<Form>;
	isDisabled: boolean;
	onClearQuery: () => void;
	onSubmitQuery: (values: Form) => void;
};
