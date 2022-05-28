import { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useMediaQuery, VStack } from '@chakra-ui/react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from '../../../../../../../components/Modal';
import { defaultValues } from '../../../../../../../pages/Authentication/Signin/components/FormContainer';
import { schema } from '../../../../../../../pages/Authentication/Signin/components/FormContainer/validation';

import { Form as FormType, FormProps } from './types';
import Username from './components/Username';
import Password from './components/Password';

const Form = ({ isOpen = false, onClose, onSubmit }: FormProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const form = useForm<FormType>({
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isDirty } = useFormState({ control: form.control });

	return (
		<Modal
			title='Enter Credentials'
			renderActions={({ color, colorMode, size }) => (
				<Button
					color={color}
					colorMode={colorMode}
					isDisabled={!isDirty}
					onClick={form.handleSubmit((values) => onSubmit(values))}
					size={size}
				>
					Switch User
				</Button>
			)}
			isOpen={isOpen}
			onClose={() => onClose()}
			isCentered
			size={isSm ? 'full' : '2xl'}
		>
			<VStack width='100%' spacing={2} p={2}>
				<Username form={form} />
				<Password form={form} />
			</VStack>
		</Modal>
	);
};

export default Form;
