import { FC } from 'react';

import { useTheme, Modal, ModalBody, ScaleFade, Fade, utils } from '@davidscicluna/component-library';

import { useConst, Center, Show } from '@chakra-ui/react';

import { useUserTheme } from '../../common/hooks';

import Label from './components/Label';
import { SplashscreenProps } from './types';
import Logo from './components/SplashscreenLogo';

const { getColor, getTransitionDuration } = utils;

const labelWidth = 166.45;
const labelHeight = 18;

const Splashscreen: FC<SplashscreenProps> = ({ isOpen = false, onClose }) => {
	const theme = useTheme();

	const { colorMode } = useUserTheme();

	const delayLogo = useConst<number>(1);
	const delayLabel = useConst<number>(2.5);

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'slow' }));

	return (
		<Modal isOpen={isOpen} closeOnEsc={false} closeOnOverlayClick={false} onClose={onClose} size='full' spacing={0}>
			<ModalBody backgroundColor={getColor({ theme, colorMode, type: 'background' })} sx={{ transition: 'none' }}>
				<Center width='100%' height='100vh'>
					{/* Top */}
					<Center position='absolute' top={0} left='50%' transform='translateX(-50%)' p={2}>
						<ScaleFade
							in
							transition={{ enter: { duration, delay: delayLabel }, exit: { duration } }}
							unmountOnExit
						>
							<Label colorMode={colorMode} />
						</ScaleFade>
					</Center>

					{/* Bottom */}
					<Center
						position='absolute'
						bottom={0}
						left='50%'
						transform='translateX(-50%) rotate(-180deg)'
						p={2}
					>
						<ScaleFade
							in
							transition={{ enter: { duration, delay: delayLabel }, exit: { duration } }}
							unmountOnExit
						>
							<Label colorMode={colorMode} />
						</ScaleFade>
					</Center>

					<Show breakpoint='(min-width: 600px)'>
						{/* Left */}
						<Center
							position='absolute'
							top='50%'
							left={-(labelWidth / 2 - labelHeight / 2)}
							transform='translateY(-50%) rotate(-90deg)'
							p={2}
						>
							<ScaleFade
								in
								transition={{ enter: { duration, delay: delayLabel }, exit: { duration } }}
								unmountOnExit
							>
								<Label colorMode={colorMode} />
							</ScaleFade>
						</Center>

						{/* Right */}
						<Center
							position='absolute'
							top='50%'
							right={-(labelWidth / 2 - labelHeight / 2)}
							transform='translateY(-50%) rotate(-270deg)'
							p={2}
						>
							<ScaleFade
								in
								transition={{ enter: { duration, delay: delayLabel }, exit: { duration } }}
								unmountOnExit
							>
								<Label colorMode={colorMode} />
							</ScaleFade>
						</Center>
					</Show>

					<Fade in transition={{ enter: { duration, delay: delayLogo }, exit: { duration } }} unmountOnExit>
						<Logo />
					</Fade>
				</Center>
			</ModalBody>
		</Modal>
	);
};

export default Splashscreen;
