import React, { ReactElement } from 'react';

import { useTheme, useColorMode, useDisclosure } from '@chakra-ui/react';

import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';


import { color } from '../../../..';
import { useSelector } from '../../../../../../../../../common/hooks';
import { handleReturnBoringSrc } from '../../../../../../../../../common/utils';
import Button from '../../../../../../../../../components/Clickable/Button';
import ConfirmModal from '../../../../../../../../../components/ConfirmModal';
import { setUser } from '../../../../../../../../../store/slices/App';
import { toggleSplashscreen } from '../../../../../../../../../store/slices/Modals';
import { guest, setUsers } from '../../../../../../../../../store/slices/Users';
import { Theme } from '../../../../../../../../../theme/types';

import { GuestProps } from './types';

const Guest = ({ renderAction }: GuestProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const handleSubmit = (): void => {
		onCloseConfirm();

		dispatch(setUser(guest.data.id));
		dispatch(
			setUsers(
				(users || [])
					.map((user) =>
						user.data.id === guest.data.id
							? {
									...guest,
									data: {
										...guest.data,
										info: {
											...guest.data.info,
											avatar_path:
												guest.data.info.avatar_path ||
												handleReturnBoringSrc(
													theme,
													'beam',
													colorMode === 'light' ? 500 : 400,
													guest.data.id
												),
											background_path:
												guest.data.info.background_path ||
												handleReturnBoringSrc(
													theme,
													'sunset',
													colorMode === 'light' ? 500 : 400,
													guest.data.id
												)
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
	};

	return (
		<>
			{renderAction({
				label: 'Or continue as a guest',
				onClick: onOpenConfirm
			})}

			<ConfirmModal
				renderActions={({ colorMode, size }) => (
					<Button color={color} colorMode={colorMode} onClick={() => handleSubmit()} size={size}>
						Sign in
					</Button>
				)}
				title='Sign in as a Guest?'
				description='Are you sure you want to sign in as a guest? You will not be able to like, create and add to lists!'
				isOpen={isConfirmOpen}
				onClose={onCloseConfirm}
			/>
		</>
	);
};

export default Guest;
