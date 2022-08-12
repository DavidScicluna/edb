import { FC, useState, useCallback } from 'react';

import { useNavigate } from 'react-router';

import { SimpleGrid, Container, VStack, Show } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useUpdateEffect } from 'usehooks-ts';
import { debounce, merge } from 'lodash';
import { SHA256 } from 'crypto-js';
import { sort } from 'fast-sort';
import dayjs from 'dayjs';

import Illustration from '../components/Illustration';
import { useSelector } from '../../../common/hooks';
import { User } from '../../../store/slices/Users/types';
import { setUser, setUsers } from '../../../store/slices/Users';
import { toggleSpinnerModal } from '../../../store/slices/Modals';

import Form from './components/Form';
import Header from './components/Header';
import { Form as FormType } from './types';
import { schema } from './validation';
import Footer from './components/Footer';
import Users from './components/Users';

export const defaultValues: FormType = {
	username: '',
	password: '',
	rememberMe: false
};

const SignIn: FC = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const [selectedUserID, setSelectedUserID] = useState<string>('');

	const form = useForm<FormType>({
		defaultValues,
		resolver: yupResolver(schema)
	});
	const { control, setValue, getValues } = form;

	const username = useWatch({ control, name: 'username' });
	const password = useWatch({ control, name: 'password' });

	const handleUserClick = (user: User): void => {
		setSelectedUserID(user.data.id);

		setValue('username', user.data.credentials.username, { shouldDirty: true });
	};

	const handleCheckForm = useCallback(
		debounce((): void => {
			const user = users.find((user) => user.data.id === selectedUserID);

			if (user && user.data.credentials.username !== username && user.data.credentials.password !== password) {
				setSelectedUserID('');
			}
		}, 500),
		[users, selectedUserID, username, password]
	);

	const handleSubmitForm = (credentials: FormType): void => {
		const user = users.find((user) => user.data.id === selectedUserID);

		if (user && SHA256(credentials.password).toString() === user.data.credentials.password) {
			const form = getValues();

			const updatedUser: User = merge(
				{ ...user },
				{
					...user,
					data: {
						...user.data,
						credentials: { ...user.data.credentials, rememberMe: form.rememberMe },
						signedInAt: dayjs().toISOString()
					}
				}
			);

			const updatedUsers: User[] = sort([...users.filter((u) => u.data.id !== user.data.id), updatedUser]).desc(
				(u) => u.data.signedInAt
			);

			dispatch(setUser({ ...updatedUser }));
			dispatch(setUsers([...updatedUsers]));

			dispatch(toggleSpinnerModal(true));

			navigate('/', { replace: true });
		} else {
			// TODO: Implement global toast system
		}
	};

	useUpdateEffect(() => handleCheckForm(), [username, password]);

	return (
		<SimpleGrid width='100%' height='100vh' columns={[1, 1, 1, 2]} spacing={0}>
			<Show breakpoint='(min-width: 992px)'>
				<Illustration />
			</Show>

			<Container
				as={VStack}
				width='100%'
				height='inherit'
				maxWidth='container.sm'
				centerContent
				justifyContent='space-between'
				p={[2, 3, 4, 6]}
				spacing={0}
			>
				<Header />

				{users.length > 0 && <Users selectedUserID={selectedUserID} onUserClick={handleUserClick} />}

				<Form form={form} onSubmit={handleSubmitForm} />

				<Footer />
			</Container>
		</SimpleGrid>
	);
};

export default SignIn;
