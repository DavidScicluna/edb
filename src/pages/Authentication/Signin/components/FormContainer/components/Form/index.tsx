import React, { ReactElement } from 'react';

import { Card, CardBody, CardFooter, Button } from '@davidscicluna/component-library';

import { useColorMode, useMediaQuery, VStack, HStack, Center } from '@chakra-ui/react';
import { Controller, useFormState } from 'react-hook-form';

import { color } from '../..';
import Link from '../../../../../../../components/Clickable/Link';
import Password from '../../../../../components/Password';
import Username from '../../../../../components/Username';

import { FormProps } from './types';
import Users from './components/Users';
import RememberMe from './components/RememberMe';
import Guest from './components/Guest';

const Form = ({ form, users, onSubmit, onChange, onUserClick }: FormProps): ReactElement => {
	const { colorMode } = useColorMode();
	const [isLgHeight] = useMediaQuery('(min-height: 900px)');

	const { isDirty } = useFormState({ control: form.control });

	return (
		<Card isFullWidth>
			<CardBody>
				<VStack width='100%' spacing={4}>
					{isLgHeight && users.length > 0 ? <Users users={users} onUserClick={onUserClick} /> : null}

					<VStack width='100%' spacing={2}>
						<Controller
							control={form.control}
							name='username'
							render={({ field, fieldState }) => (
								<Username
									field={{
										...field,
										onChange: (event: unknown) => {
											field.onChange(event);
											onChange();
										}
									}}
									fieldState={fieldState}
									color={color}
									colorMode={colorMode}
								/>
							)}
						/>
						<Controller
							control={form.control}
							name='password'
							render={({ field, fieldState }) => (
								<Password
									field={{
										...field,
										onChange: (event: unknown) => {
											field.onChange(event);
											onChange();
										}
									}}
									fieldState={fieldState}
									color={color}
									colorMode={colorMode}
								/>
							)}
						/>

						<HStack width='100%' justifyContent='space-between'>
							<RememberMe form={form} />

							<Link to='/forgot-password'>
								<Button color={color} size='sm' variant='text' sx={{ front: { px: 0 } }}>
									Forgot password?
								</Button>
							</Link>
						</HStack>
					</VStack>
				</VStack>
			</CardBody>
			<CardFooter>
				<VStack width='100%'>
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
								<Button isFullWidth onClick={() => onClick()} variant='text'>
									{label}
								</Button>
							)}
						/>
					</Center>
				</VStack>
			</CardFooter>
		</Card>
	);
};

export default Form;
