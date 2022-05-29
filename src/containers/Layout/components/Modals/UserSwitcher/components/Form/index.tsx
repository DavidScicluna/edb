import { ReactElement } from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, IconButton, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Text } from '@chakra-ui/react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
		<Modal isOpen={isOpen} onClose={onClose} size={isSm ? 'full' : '2xl'}>
			<ModalHeader
				renderTitle={(props) => <Text {...props}>Enter Credentials</Text>}
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<Icon icon={icon} category={category} />
					</IconButton>
				)}
			/>
			<ModalBody>
				<VStack width='100%' spacing={2} p={2}>
					<Username form={form} />
					<Password form={form} />
				</VStack>
			</ModalBody>
			<ModalFooter
				renderCancel={(props) => (
					<Button {...props} onClick={onClose}>
						Cancel
					</Button>
				)}
				renderAction={(props) => (
					<Button
						{...props}
						// color={color}
						color='blue'
						isDisabled={!isDirty}
						onClick={form.handleSubmit((values) => onSubmit(values))}
					>
						Switch User
					</Button>
				)}
			/>
		</Modal>
	);
};

export default Form;
