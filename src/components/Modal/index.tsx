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
} from '@chakra-ui/react';

import { useTimeout } from 'usehooks-ts';

import { ModalProps } from './types';

import { useSelector } from '../../common/hooks';
import { handleConvertStringToNumber } from '../../common/utils';
import { Theme } from '../../theme/types';
import Button from '../Clickable/Button';
import IconButton from '../Clickable/IconButton';
import Icon from '../Icon';

const Modal = (props: ModalProps): ReactElement | null => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector((state) => state.user.ui.theme.color);

	const {
		children,
		title,
		renderActions,
		colorMode: colorModeProp,
		isConfirm = false,
		isOpen,
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
						<Button colorMode={colorMode} onClick={() => onClose()} variant='outlined'>
							Cancel
						</Button>

						{renderActions({ color, colorMode, size: 'md' })}
					</ModalFooter>
				) : null}
			</ModalContent>
		</CUIModal>
	) : null;
};

export default Modal;
