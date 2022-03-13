import React, { ReactElement } from 'react';
import { useFormState } from 'react-hook-form';

import { VStack, HStack } from '@chakra-ui/react';

import Password from './components/Password';
import RememberMe from './components/RememberMe';
import Username from './components/Username';
import { FormProps } from './types';

import { color } from '../..';
import Button from '../../../../../../components/Clickable/Button';
import Link from '../../../../../../components/Clickable/Link';

const Form = ({ form, onSubmit }: FormProps): ReactElement => {
	const { isDirty } = useFormState({ control: form.control });

	return (
		<VStack width='100%' spacing={4}>
			<VStack width='100%' spacing={2}>
				<Username form={form} />
				<Password form={form} />

				<HStack width='100%' justifyContent='space-between'>
					<RememberMe form={form} />

					<Link to='/forgot-password'>
						<Button color={color} size='sm' variant='text' sx={{ front: { px: 0 } }}>
							Forgot password?
						</Button>
					</Link>
				</HStack>
			</VStack>

			<VStack width='100%' spacing={1}>
				<Button
					color={color}
					isDisabled={!isDirty}
					isFullWidth
					onClick={form.handleSubmit((values) => onSubmit(values))}
				>
					Sign In
				</Button>
				<Button isFullWidth size='sm' variant='text'>
					Or continue as guest
				</Button>
			</VStack>
		</VStack>
	);
};

export default Form;
