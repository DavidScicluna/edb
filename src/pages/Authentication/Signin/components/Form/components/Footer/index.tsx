import React, { FC } from 'react';

import { useNavigate } from 'react-router';

import {
	useTheme,
	ConfirmModal,
	ConfirmModalBody,
	ConfirmModalFooter,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	Button,
	IconButton,
	Icon,
	utils
} from '@davidscicluna/component-library';

import { useDisclosure, VStack } from '@chakra-ui/react';

import { useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { merge } from 'lodash';

import { useUserTheme } from '../../../../../../../common/hooks';
import { guest, setUser } from '../../../../../../../store/slices/Users';
import { toggleSpinnerModal } from '../../../../../../../store/slices/Modals';
import { getBoringAvatarSrc } from '../../../../../../../common/utils';

import { FooterProps } from './types';

const { getHue } = utils;

const Footer: FC<FooterProps> = ({ form }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const navigate = useNavigate();

	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

	const dispatch = useDispatch();

	const { control } = form;

	const { isDirty } = useFormState({ control });

	const handleSubmit = (): void => {
		onConfirmClose();

		// TODO: Check if avatar is re generated
		dispatch(
			setUser({
				...merge(guest, {
					...guest,
					data: {
						...guest.data,
						info: {
							...guest.data.info,
							avatar_path: getBoringAvatarSrc({
								id: guest.data.id,
								colors: theme.colors,
								hue: getHue({ colorMode, type: 'color' }),
								size: 500,
								variant: 'beam'
							})
						}
					}
				})
			})
		);
		dispatch(toggleSpinnerModal(true));

		navigate('/', { replace: true });
	};

	return (
		<>
			<VStack width='100%' spacing={1}>
				<Button color={color} colorMode={colorMode} isDisabled={!isDirty} isFullWidth type='submit'>
					Sign In
				</Button>

				<Button colorMode={colorMode} isFullWidth onClick={() => onConfirmOpen()} size='xs' variant='text'>
					Or continue as a guest
				</Button>
			</VStack>

			<ConfirmModal
				colorMode={colorMode}
				isOpen={isConfirmOpen}
				onClose={onConfirmClose}
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<Icon icon={icon} category={category} />
					</IconButton>
				)}
			>
				<ConfirmModalBody>
					<ConfirmModalTitle>Sign in as a Guest?</ConfirmModalTitle>
					<ConfirmModalSubtitle>
						Are you sure you want to sign in as a guest? You will not be able to like, create and add to
						lists!
					</ConfirmModalSubtitle>
				</ConfirmModalBody>
				<ConfirmModalFooter
					renderCancel={(props) => <Button {...props}>Cancel</Button>}
					renderAction={(props) => (
						<Button {...props} color={color} onClick={() => handleSubmit()}>
							Sign in
						</Button>
					)}
				/>
			</ConfirmModal>
		</>
	);
};

export default Footer;
