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

const MotionBox = motion(Box);

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
								duration: 10,
								ease: [0.76, 0, 0.24, 1],
								repeat: Infinity
							}}
							bgSize='500%'
							bgGradient='linear(to-r, red.400, orange.400, yellow.400, green.400, teal.400, blue.400, cyan.400, purple.400, pink.400)'
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
