import { InputProps } from '@chakra-ui/react';

import { UseFormReturn } from 'react-hook-form';

import { SearchForm } from '../../../../types';
import { SearchFormProps } from '../../types';

export type SearchInputProps = Pick<InputProps, 'isDisabled'> & {
	form: UseFormReturn<SearchForm>;
	onClearQuery: () => void;
	onSubmitQuery: (values: SearchForm) => void;
} & Pick<SearchFormProps, 'isFocused' | 'onFocus' | 'onBlur'>;
