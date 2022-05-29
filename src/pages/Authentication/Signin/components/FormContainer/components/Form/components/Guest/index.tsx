import { ReactElement } from 'react';

import {
	useTheme,
	ConfirmModal,
	ConfirmModalBody,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalFooter,
	Button,
	IconButton,
	Icon
} from '@davidscicluna/component-library';

import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

// import { color } from '../../../..';
import { useSelector } from '../../../../../../../../../common/hooks';
import { handleReturnBoringSrc } from '../../../../../../../../../common/utils';
import { setUser } from '../../../../../../../../../store/slices/App';
import { toggleSplashscreen } from '../../../../../../../../../store/slices/Modals';
import { guest, setUsers } from '../../../../../../../../../store/slices/Users';

import { GuestProps } from './types';

const Guest = ({ renderAction }: GuestProps): ReactElement => {
	const theme = useTheme();
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
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<Icon icon={icon} category={category} />
					</IconButton>
				)}
				isOpen={isConfirmOpen}
				onClose={onCloseConfirm}
			>
				<ConfirmModalBody>
					<ConfirmModalTitle>Sign in as a Guest?</ConfirmModalTitle>
					<ConfirmModalSubtitle>
						Are you sure you want to sign in as a guest? You will not be able to like, create and add to
						lists!
					</ConfirmModalSubtitle>
				</ConfirmModalBody>
				<ConfirmModalFooter
					renderCancel={(props) => (
						<Button {...props} onClick={onCloseConfirm}>
							Cancel
						</Button>
					)}
					renderAction={(props) => (
						<Button
							{...props}
							// color={color}
							color='blue'
							onClick={handleSubmit}
						>
							Sign in
						</Button>
					)}
				/>
			</ConfirmModal>
		</>
	);
};

export default Guest;
