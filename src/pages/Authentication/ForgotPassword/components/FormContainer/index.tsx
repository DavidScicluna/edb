import { ReactElement } from 'react';

import { Card, CardBody, CardFooter, Color, Button } from '@davidscicluna/component-library';

import { useColorMode, Container, VStack, HStack, Text } from '@chakra-ui/react';

import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Divider from '../../../../../components/Divider';
import Password from '../../../components/Password';
import Username from '../../../components/Username';

import { schema } from './validation';
import { Form } from './types';

export const color: Color = 'light_blue';

export const defaultValues: Form = {
	username: '',
	password: '',
	newPassword: '',
	confirmNewPassword: ''
};

const FormContainer = (): ReactElement => {
	const { colorMode } = useColorMode();

	const navigate = useNavigate();

	const form = useForm<Form>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const handleChangePassword = (values: Form): void => {
		console.log(values);
	};

	return (
		<Container
			as={VStack}
			width='100%'
			height='inherit'
			maxWidth='container.sm'
			centerContent
			justifyContent='center'
			p={4}
			spacing={0}
		>
			<Card isFullWidth>
				<CardBody>
					<VStack width='100%' divider={<Divider />} spacing={4}>
						<VStack width='100%' alignItems='flex-start' spacing={0}>
							<Text
								align='left'
								color={`gray.${colorMode === 'light' ? 900 : 50}`}
								fontSize='4xl'
								fontWeight='semibold'
							>
								Forgot Password?
							</Text>
							<Text align='left' color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='sm'>
								In order to reset password please enter the username, the current password and the new
								password!
							</Text>
						</VStack>

						<Controller
							control={form.control}
							name='username'
							render={({ field, fieldState }) => (
								<Username field={field} fieldState={fieldState} color={color} colorMode={colorMode} />
							)}
						/>

						<VStack width='100%' spacing={2}>
							<Controller
								control={form.control}
								name='password'
								render={({ field, fieldState }) => (
									<Password
										field={field}
										fieldState={fieldState}
										color={color}
										colorMode={colorMode}
									/>
								)}
							/>
							<Controller
								control={form.control}
								name='newPassword'
								render={({ field, fieldState }) => (
									<Password
										field={field}
										fieldState={fieldState}
										label='New Password'
										color={color}
										colorMode={colorMode}
									/>
								)}
							/>
							<Controller
								control={form.control}
								name='confirmNewPassword'
								render={({ field, fieldState }) => (
									<Password
										field={field}
										fieldState={fieldState}
										label='Confirm Password'
										color={color}
										colorMode={colorMode}
									/>
								)}
							/>
						</VStack>
					</VStack>
				</CardBody>
				<CardFooter>
					<HStack width='100%' justifyContent='space-between'>
						<Button onClick={() => navigate(-1)} variant='outlined'>
							Back
						</Button>

						<Button color={color} onClick={form.handleSubmit((values) => handleChangePassword(values))}>
							Change Password
						</Button>
					</HStack>
				</CardFooter>
			</Card>
		</Container>
	);
};

export default FormContainer;
