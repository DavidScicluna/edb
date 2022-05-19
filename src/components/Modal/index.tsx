import { ReactElement, useEffect } from 'react';

import {
	ColorMode,
	useTheme,
	useColorMode,
	useMediaQuery,
	useBoolean,
	Modal as CUIModal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	HStack,
	Text
, Button } from '@chakra-ui/react';

import { useTimeout } from 'usehooks-ts';


import { useSelector } from '../../common/hooks';
import { handleConvertStringToNumber } from '../../common/utils';
import { defaultUser, getUser } from '../../store/slices/Users';
import { Theme } from '../../theme/types';
import IconButton from '../Clickable/IconButton';
import Icon from '../Icon';

import { ModalProps } from './types';

const Modal = (props: ModalProps): ReactElement | null => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const {
		children,
		title,
		renderActions,
		colorMode: colorModeProp,
		isConfirm = false,
		isOpen = false,
		hasCancel = true,
		onClose,
		size,
		...rest
	} = props;

	const [isMounted, setIsMounted] = useBoolean();

	const colorMode: ColorMode = colorModeProp || colorModeHook;
	const transition = `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`;

	useTimeout(
		() => setIsMounted.off(),
		!isOpen ? handleConvertStringToNumber(theme.transition.duration.faster, 'ms') : null
	);

	useEffect(() => {
		if (isOpen) {
			setIsMounted.on();
		}
	}, [isOpen]);

	return isMounted ? (
		<CUIModal
			{...rest}
			isOpen={isOpen}
			onClose={onClose}
			blockScrollOnMount
			preserveScrollBarGap
			motionPreset='slideInBottom'
			scrollBehavior='inside'
			size={isSm && !isConfirm ? 'full' : size}
		>
			<ModalOverlay />
			<ModalContent
				backgroundColor={`gray.${colorMode === 'light' ? 50 : 900}`}
				borderRadius={size === 'full' || (isSm && !isConfirm) ? 'none' : 'xl'}
				m={isSm && isConfirm ? 2 : 0}
				sx={{ transition }}
			>
				<ModalHeader
					borderBottom='solid2'
					borderBottomColor={`gray.${colorMode === 'light' ? 200 : 700}`}
					px={2}
					py={1.5}
					sx={{ transition }}
				>
					<HStack justifyContent='space-between'>
						{typeof title === 'string' ? (
							<Text
								align='left'
								fontSize='xl'
								fontWeight='semibold'
								color={`gray.${colorMode === 'light' ? 900 : 50}`}
							>
								{title}
							</Text>
						) : (
							title
						)}

						<IconButton
							aria-label='Close modal?'
							colorMode={colorMode}
							onClick={() => onClose()}
							variant='icon'
						>
							<Icon icon='close' type='outlined' />
						</IconButton>
					</HStack>
				</ModalHeader>
				<ModalBody p={0}>{children}</ModalBody>
				{renderActions ? (
					<ModalFooter
						justifyContent='space-between'
						borderTop='solid2'
						borderTopColor={`gray.${colorMode === 'light' ? 200 : 700}`}
						p={2}
						sx={{ transition }}
					>
						{hasCancel ? (
							<Button colorMode={colorMode} onClick={() => onClose()} variant='outlined'>
								Cancel
							</Button>
						) : null}

						{renderActions({ color, colorMode, size: 'md' })}
					</ModalFooter>
				) : null}
			</ModalContent>
		</CUIModal>
	) : null;
};

export default Modal;
