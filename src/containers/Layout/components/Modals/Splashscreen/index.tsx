import { ReactElement, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useColorMode, Modal, ModalContent, ModalBody, VStack, Box, Text } from '@chakra-ui/react';

import { motion } from 'framer-motion';
import _ from 'lodash';
import { useInterval } from 'usehooks-ts';

import useStyles from './styles';
import { SplashscreenProps } from './types';

import { useSelector } from '../../../../../common/hooks';
import { toggleSplashscreen } from '../../../../../store/slices/Modals';
import { Color } from '../../../../../theme/types';

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

const Splashscreen = ({ isOpen: isOpenProp }: SplashscreenProps): ReactElement => {
	const { colorMode } = useColorMode();

	const dispatch = useDispatch();
	const isSplashscreenOpen = useSelector((state) => state.modals.ui.isSplashscreenOpen);

	const isOpen: boolean = isOpenProp || isSplashscreenOpen;

	const style = useStyles();

	const [loadingDots, setLoadingDots] = useState<string>('.');

	const handleLoadingDots = (): void => {
		if (loadingDots.length === 4) {
			setLoadingDots('.');
		} else {
			setLoadingDots(`${loadingDots}.`);
		}
	};

	useInterval(() => handleLoadingDots(), isOpen ? 250 : null);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => dispatch(toggleSplashscreen(false)), 2500);
		}
	}, [isOpen]);

	return (
		<Modal
			closeOnEsc={false}
			closeOnOverlayClick={false}
			isOpen={isOpen}
			onClose={() => dispatch(toggleSplashscreen(false))}
			motionPreset='slideInBottom'
			scrollBehavior='inside'
			size='full'
		>
			<ModalContent backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'} borderRadius='none' m={0}>
				<ModalBody zIndex={10000} p={0}>
					<VStack width='100%' height='100vh' justifyContent='space-between' p={3}>
						<Text
							align='center'
							color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
							fontSize='sm'
							fontWeight='medium'
						>
							Entertainment database
						</Text>
						<MotionBox
							animate={{
								backgroundPosition: [
									..._.range(0, 101, 1).map((number) => `${number}%`),
									..._.reverse(_.range(0, 101, 1).map((number) => `${number}%`))
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
							color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
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
