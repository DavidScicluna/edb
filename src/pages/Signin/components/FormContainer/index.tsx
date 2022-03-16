import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import { useMediaQuery, Container, VStack } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';

import Form from './components/Form';
import Header from './components/Header';
import { Form as FormType } from './types';
import { schema } from './validation';

import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import { Color } from '../../../../theme/types';

export const color: keyof Color = 'light_blue';

export const defaultValues: FormType = {
	username: '',
	password: '',
	rememberMe: false
};

const FormContainer = (): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const form = useForm<FormType>({
		defaultValues,
		resolver: yupResolver(schema)
	});

	const handleSubmit = (values: FormType): void => {
		console.log(values);
	};

	return (
		<Container
			as={VStack}
			width='100%'
			height='inherit'
			maxWidth='container.sm'
			centerContent
			justifyContent='space-between'
			p={6}
			spacing={0}
		>
			<Header />

			<Form form={form} onSubmit={handleSubmit} />

			<Link to='/register' style={{ width: '100%', height: 'auto' }}>
				<Button color={color} isFullWidth variant='text'>
					{isSm ? 'Register new account here!' : `Don't have an account yet? Register here!`}
				</Button>
			</Link>
		</Container>
	);
};

export default FormContainer;