import { FC, useState, useCallback } from 'react';

import { useNavigate } from 'react-router';

import { useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, Center, Container, VStack } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useElementSize, useUpdateEffect } from 'usehooks-ts';
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
	const theme = useTheme();
	const [isLg] = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const [illustrationRef, { width: illustrationWidth, height: illustrationHeight }] = useElementSize();

	const [selectedUserID, setSelectedUserID] = useState<string>('');

	const form = useForm<FormType>({
		defaultValues,
		resolver: yupResolver(schema)
	});
	const { control, setValue, getValues } = form;

	const watchUsername = useWatch({ control, name: 'username' });
	const watchPassword = useWatch({ control, name: 'password' });

	const handleUserClick = (user: User): void => {
		setSelectedUserID(user.data.id);

		setValue('username', user.data.credentials.username, { shouldDirty: true });
	};

	const handleCheckForm = useCallback(
		debounce((): void => {
			const user = users.find((user) => user.data.id === selectedUserID);

			if (
				user &&
				user.data.credentials.username !== watchUsername &&
				user.data.credentials.password !== watchPassword
			) {
				setSelectedUserID('');
			}
		}, 500),
		[users, selectedUserID, watchUsername, watchPassword]
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

	useUpdateEffect(() => handleCheckForm(), [watchUsername, watchPassword]);

	return (
		<Center width='100%' minHeight='100vh' position='relative' overflowX='hidden' overflowY='auto'>
			{isLg && <Illustration ref={illustrationRef} position='fixed' top={0} left={0} />}

			<Center
				width={isLg ? `calc(100% - ${illustrationWidth}px)` : '100%'}
				minHeight='100vh'
				position='absolute'
				top={0}
				right={0}
				alignItems='center'
				justifyContent='center'
			>
				<Container
					as={VStack}
					width='100%'
					minHeight='inherit'
					maxWidth='container.lg'
					centerContent
					justifyContent='space-between'
					spacing={[3, 3, 4, 4]}
					px={[2, 2, 3, 3]}
					py={[3, 3, 4, 4]}
				>
					<Header />

					{users.length > 0 && <Users selectedUserID={selectedUserID} onUserClick={handleUserClick} />}

					<Form form={form} onSubmit={handleSubmitForm} />

					<Footer />
				</Container>
			</Center>
		</Center>
	);
};

export default SignIn;
