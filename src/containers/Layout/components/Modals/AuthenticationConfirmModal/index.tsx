import { FC, useCallback } from 'react';

import {
	useTheme,
	ConfirmModal,
	ConfirmModalStack,
	ConfirmModalIcon,
	ConfirmModalBody,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalFooter,
	InternalLink,
	Button,
	IconButton,
	IconButtonIcon,
	Icon
} from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';

import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { defaultAuthenticationConfirmModal, setAuthenticationConfirmModal } from '../../../../../store/slices/Modals';

const AuthenticationConfirmModal: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const { isOpen = false, title, description } = useSelector((state) => state.modals.ui.authenticationConfirmModal);

	const handleClose = useCallback(() => {
		dispatch(setAuthenticationConfirmModal({ ...defaultAuthenticationConfirmModal }));
	}, [defaultAuthenticationConfirmModal]);

	return (
		<ConfirmModal
			colorMode={colorMode}
			renderCancel={({ icon, category, ...rest }) => (
				<IconButton {...rest}>
					<IconButtonIcon icon={icon} category={category} />
				</IconButton>
			)}
			isOpen={isOpen}
			onClose={handleClose}
		>
			<ConfirmModalStack spacing={4} p={4}>
				<ConfirmModalIcon
					renderIcon={(props) => (
						<Icon
							{...props}
							width={theme.fontSizes['6xl']}
							height={theme.fontSizes['6xl']}
							fontSize={theme.fontSizes['6xl']}
							icon='login'
							category='outlined'
						/>
					)}
					color={color}
					p={2}
				/>

				<ConfirmModalBody>
					<ConfirmModalTitle>{title}</ConfirmModalTitle>

					<VStack width='100%' spacing={2}>
						{typeof description === 'string' ? (
							<ConfirmModalSubtitle>{description}</ConfirmModalSubtitle>
						) : (
							description.map((line, index) => (
								<ConfirmModalSubtitle key={index}>{line}</ConfirmModalSubtitle>
							))
						)}
					</VStack>
				</ConfirmModalBody>
				<ConfirmModalFooter
					renderCancel={(props) => <Button {...props}>Cancel</Button>}
					renderAction={(props) => (
						<InternalLink to='/authentication/signin' isFullWidth>
							<Button {...props} color={color} onClick={handleClose}>
								Sign In
							</Button>
						</InternalLink>
					)}
				/>
			</ConfirmModalStack>
		</ConfirmModal>
	);
};

export default AuthenticationConfirmModal;
