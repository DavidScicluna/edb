import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useMediaQuery, useBoolean, Container, VStack } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import sha256 from 'crypto-js/sha256';

import Form from './components/Form';
import Header from './components/Header';
import Users from './components/Users';
import { Form as FormType } from './types';
import { schema } from './validation';

import { useSelector } from '../../../../../common/hooks';
import Button from '../../../../../components/Clickable/Button';
import Link from '../../../../../components/Clickable/Link';
import { setUser } from '../../../../../store/slices/App';
import { toggleSplashscreen } from '../../../../../store/slices/Modals';
import { Credentials } from '../../../../../store/slices/Users/types';
import { Color } from '../../../../../theme/types';

export const color: keyof Color = 'light_blue';

export const defaultValues: FormType = {
	username: '',
	password: '',
	rememberMe: false
};

const FormContainer = (): ReactElement => {
	const [isSmWidth] = useMediaQuery('(max-width: 600px)');
	const [isLgHeight] = useMediaQuery('(min-height: 900px)');

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const [isUserTyped, setIsUserTyped] = useBoolean();

	const form = useForm<FormType>({
		defaultValues,
		resolver: yupResolver(schema)
	});

	const handleUserClick = (credentials: Credentials): void => {
		setIsUserTyped.off();

		form.setValue('username', credentials.username, { shouldDirty: true });
		form.setValue('password', credentials.password, { shouldDirty: true });
	};

	const handleSuccessSignIn = (id: string): void => {
		dispatch(setUser(id));

		dispatch(toggleSplashscreen(true));

		navigate('/', { replace: true });
	};

	const handleUnsuccessfulSignIn = (): void => {
		// TODO: Implement global toast system
	};

	const handleSubmit = (credentials: FormType): void => {
		const user = users.find((user) => user.data.credentials?.username === credentials.username);

		if (
			user &&
			((isUserTyped && sha256(credentials.password).toString() === user.data.credentials?.password) ||
				credentials.password === user.data.credentials?.password)
		) {
			handleSuccessSignIn(user.data.id);
		} else {
			handleUnsuccessfulSignIn();
		}
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

			{isLgHeight && users.length > 0 ? <Users users={users} onUserClick={handleUserClick} /> : null}

			<Form form={form} onSubmit={handleSubmit} onChange={() => setIsUserTyped.on()} />

			<Link to='/register' style={{ width: '100%', height: 'auto' }}>
				<Button color={color} isFullWidth variant='text'>
					{isSmWidth ? 'Register new account here!' : `Don't have an account yet? Register here!`}
				</Button>
			</Link>
		</Container>
	);
};

export default FormContainer;
