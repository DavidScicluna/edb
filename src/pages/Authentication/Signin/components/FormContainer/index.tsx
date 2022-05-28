import { ReactElement } from 'react';

import { Color, Button } from '@davidscicluna/component-library';

import { useMediaQuery, useBoolean, Container, VStack } from '@chakra-ui/react';

import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import sha256 from 'crypto-js/sha256';
import dayjs from 'dayjs';

import { useSelector } from '../../../../../common/hooks';
import Link from '../../../../../components/Clickable/Link';
import { setUser } from '../../../../../store/slices/App';
import { toggleSplashscreen } from '../../../../../store/slices/Modals';
import { guest, setUsers } from '../../../../../store/slices/Users';
import { Credentials, User } from '../../../../../store/slices/Users/types';

import { schema } from './validation';
import { Form as FormType } from './types';
import Header from './components/Header';
import Form from './components/Form';

export const color: Color = 'light_blue';

export const defaultValues: FormType = {
	username: '',
	password: '',
	rememberMe: false
};

const FormContainer = (): ReactElement => {
	const [isSmWidth] = useMediaQuery('(max-width: 600px)');

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.users.data.users || []);

	const [isUserTyped, setIsUserTyped] = useBoolean();

	const users: User[] = allUsers.filter((user) => user.data.id !== guest.data.id) || [];

	const form = useForm<FormType>({
		defaultValues,
		resolver: yupResolver(schema)
	});

	const handleUserClick = (credentials?: Credentials): void => {
		setIsUserTyped.off();

		if (credentials && credentials.username && credentials.password) {
			form.setValue('username', credentials.username, { shouldDirty: true });
			form.setValue('password', credentials.password, { shouldDirty: true });
		} else {
			// TODO: Implement global toast system
		}
	};

	const handleSubmit = (credentials: FormType): void => {
		const user = users.find((user) => user.data.credentials?.username === credentials.username);

		if (
			user &&
			((isUserTyped && sha256(credentials.password).toString() === user.data.credentials?.password) ||
				credentials.password === user.data.credentials?.password)
		) {
			const id = user.data.id;

			dispatch(setUser(id));
			dispatch(
				setUsers(
					allUsers
						.map((user) =>
							user.data.id === id
								? {
										...user,
										data: {
											...user.data,
											credentials: {
												...(user.data.credentials || {}),
												username: credentials.username,
												password: credentials.password,
												rememberMe: credentials.rememberMe
											},
											signedInAt: dayjs().toISOString()
										}
								  }
								: user
						)
						.sort((a, b) => dayjs(b.data.signedInAt).diff(a.data.signedInAt))
				)
			);

			dispatch(toggleSplashscreen(true));

			navigate('/', { replace: true });
		} else {
			// TODO: Implement global toast system
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
			p={4}
			spacing={0}
		>
			<Header />

			<Form
				form={form}
				users={users}
				onSubmit={handleSubmit}
				onChange={() => setIsUserTyped.on()}
				onUserClick={handleUserClick}
			/>

			<Link to='/register' style={{ width: '100%', height: 'auto' }}>
				<Button color={color} isFullWidth variant='text'>
					{isSmWidth ? 'Register new account here!' : `Don't have an account yet? Register here!`}
				</Button>
			</Link>
		</Container>
	);
};

export default FormContainer;
