import React, { ReactElement } from 'react';
import { useFormState } from 'react-hook-form';

import { VStack, HStack, Center } from '@chakra-ui/react';

import Guest from './components/Guest';
import Password from './components/Password';
import RememberMe from './components/RememberMe';
import Username from './components/Username';
import { FormProps } from './types';

import { color } from '../..';
import Button from '../../../../../../../components/Clickable/Button';
import Link from '../../../../../../../components/Clickable/Link';

const Form = ({ form, onSubmit, onChange }: FormProps): ReactElement => {
	const { isDirty } = useFormState({ control: form.control });

	return (
		<VStack width='100%' spacing={4}>
			<VStack width='100%' spacing={2}>
				<Username form={form} onChange={onChange} />
				<Password form={form} onChange={onChange} />

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
				<Center width='100%'>
					<Button
						color={color}
						isDisabled={!isDirty}
						isFullWidth
						onClick={form.handleSubmit((values) => onSubmit(values))}
						sx={{ back: { marginTop: '0 !important' } }}
					>
						Sign In
					</Button>
				</Center>
				<Center width='100%'>
					<Guest
						renderAction={({ label, onClick }) => (
							<Button isFullWidth onClick={() => onClick()} size='sm' variant='text'>
								{label}
							</Button>
						)}
					/>
				</Center>
			</VStack>
		</VStack>
	);
};

export default Form;
