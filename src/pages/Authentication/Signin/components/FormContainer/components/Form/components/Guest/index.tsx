import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useDisclosure } from '@chakra-ui/react';

import { GuestProps } from './types';

import { color } from '../../../..';
import Button from '../../../../../../../../../components/Clickable/Button';
import ConfirmModal from '../../../../../../../../../components/ConfirmModal';
import { setUser } from '../../../../../../../../../store/slices/App';
import { toggleSplashscreen } from '../../../../../../../../../store/slices/Modals';

const Guest = ({ renderAction }: GuestProps): ReactElement => {
	const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleSubmit = (): void => {
		onCloseConfirm();

		dispatch(setUser('guest'));

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
