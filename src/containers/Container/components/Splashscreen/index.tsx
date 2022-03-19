import { ReactElement, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useColorMode, Modal, ModalContent, ModalBody, VStack, Box, Text } from '@chakra-ui/react';

import { motion } from 'framer-motion';
import { range, reverse } from 'lodash';
import { useTernaryDarkMode, useInterval, useEffectOnce } from 'usehooks-ts';

import useStyles from './styles';
import { SplashscreenProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { toggleSplashscreen } from '../../../../store/slices/Modals';
import { getUser } from '../../../../store/slices/Users';
import { Color } from '../../../../theme/types';

const MotionBox = motion(Box);

const colors: (keyof Color)[] = [
	'red',
	'pink',
	'purple',
	'deep_purple',
	'indigo',
	'blue',
	'light_blue',
	'cyan',
	'teal',
	'green',
	'light_green',
	'lime',
	'yellow',
	'orange',
	'deep_orange'
];

const Splashscreen = ({ isOpen = false }: SplashscreenProps): ReactElement => {
	const { colorMode: colorModeHook, setColorMode } = useColorMode();

	const dispatch = useDispatch();
	const colorMode = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.colorMode || colorModeHook
	);

	const style = useStyles();

	const [loadingDots, setLoadingDots] = useState<string>('.');

	const { isDarkMode } = useTernaryDarkMode();

	const handleSetColorMode = useCallback(() => {
		if (colorMode === 'system') {
			dispatch(toggleSplashscreen(true));

			setColorMode(isDarkMode ? 'dark' : 'light');
		} else {
			setColorMode(colorMode);
		}
	}, [colorMode, isDarkMode]);

	const handleLoadingDots = (): void => {
		if (loadingDots.length === 3) {
			setLoadingDots('.');
		} else {
			setLoadingDots(`${loadingDots}.`);
		}
	};

	useInterval(() => handleLoadingDots(), isOpen ? 250 : null);

	useEffectOnce(() => handleSetColorMode());

	return (
		<Modal
			closeOnEsc={false}
			closeOnOverlayClick={false}
			isOpen={isOpen}
			onClose={() => console.log('')}
			motionPreset='slideInBottom'
			scrollBehavior='inside'
			size='full'
		>
			<ModalContent backgroundColor={`gray.${colorMode === 'light' ? 50 : 900}`} borderRadius='none' m={0}>
				<ModalBody zIndex={10000} p={0}>
					<VStack width='100%' height='100vh' justifyContent='space-between' p={3}>
						<Text
							align='center'
							color={`gray.${colorMode === 'light' ? 400 : 500}`}
							fontSize='sm'
							fontWeight='medium'
						>
							Entertainment database
						</Text>
						<MotionBox
							animate={{
								backgroundPosition: [
									...range(0, 101, 1).map((number) => `${number}%`),
									...reverse(range(0, 101, 1).map((number) => `${number}%`))
								]
							}}
							transition={{
								duration: 5,
								ease: [0.76, 0, 0.24, 1],
								repeat: Infinity
							}}
							bgSize='500%'
							bgGradient={`linear(to-r, ${colors.map((color) => `${color}.400`).join(', ')})`}
							bgClip='text'
							sx={{ ...style }}
						>
							edb
						</MotionBox>
						<Text
							align='center'
							color={`gray.${colorMode === 'light' ? 400 : 500}`}
							fontSize='sm'
							fontWeight='medium'
						>
							{`Loading${loadingDots}`}
						</Text>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default Splashscreen;
