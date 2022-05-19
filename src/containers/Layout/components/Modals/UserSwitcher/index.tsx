import React, { ReactElement, useState } from 'react';


import { Button } from '@davidscicluna/component-library';

import { useMediaQuery, useDisclosure, Center } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { SHA256 } from 'crypto-js';
import dayjs from 'dayjs';
import { isEmpty, isNil } from 'lodash';


import { useSelector } from '../../../../../common/hooks';
import VerticalGrid from '../../../../../components/Grid/Vertical';
import Modal from '../../../../../components/Modal';
import { setUser } from '../../../../../store/slices/App';
import { toggleSplashscreen, toggleUserSwitcher } from '../../../../../store/slices/Modals';
import { setUsers } from '../../../../../store/slices/Users';
import { User as UserType } from '../../../../../store/slices/Users/types';

import User from './components/User';
import { Form as FormType } from './components/Form/types';
import Form from './components/Form';

const UserSwitcher = (): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();

	const dispatch = useDispatch();
	const id = useSelector((state) => state.app.data.user);
	const users = useSelector((state) => state.users.data.users.filter((user) => user.data.id !== id));
	const isUserSwitcherModalOpen = useSelector((state) => state.modals.ui.isUserSwitcherModalOpen);

	const [selected, setSelected] = useState<UserType>();

	const handleClose = (): void => {
		setSelected(undefined);
		dispatch(toggleUserSwitcher(false));
	};

	const handleSwitchUser = (values: FormType): void => {
		if (selected && SHA256(values.password).toString() === selected.data.credentials?.password) {
			const id = selected.data.id;

			dispatch(setUser(id));
			dispatch(
				setUsers(
					users
						.map((user) =>
							user.data.id === id
								? { ...user, data: { ...user.data, signedInAt: dayjs().toISOString() } }
								: user
						)
						.sort((a, b) => dayjs(b.data.signedInAt).diff(a.data.signedInAt))
				)
			);

			dispatch(toggleSplashscreen(true));

			onFormClose();
			handleClose();
		} else {
			// TODO: Implement global toast system
		}
	};

	return (
		<>
			<Modal
				title='Switch User'
				renderActions={({ color, colorMode, size }) => (
					<Button
						color={color}
						colorMode={colorMode}
						isDisabled={isNil(selected) || isEmpty(selected)}
						onClick={() => onFormOpen()}
						size={size}
					>
						Enter Credentials
					</Button>
				)}
				isOpen={isUserSwitcherModalOpen}
				onClose={() => handleClose()}
				isCentered
				size={isSm ? 'full' : '4xl'}
			>
				<Center width='100%' p={2}>
					<VerticalGrid columns={[1, 2, 3, 3, 3, 3]} displayMode='grid'>
						{() =>
							users.map((user) => (
								<User
									key={user.data.id}
									user={user}
									isActive={selected?.data.id === user.data.id}
									onClick={() => setSelected(user)}
								/>
							))
						}
					</VerticalGrid>
				</Center>
			</Modal>

			{isUserSwitcherModalOpen ? (
				<Form isOpen={isFormOpen} onClose={onFormClose} onSubmit={handleSwitchUser} />
			) : null}
		</>
	);
};

export default UserSwitcher;
