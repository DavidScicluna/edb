import { FC } from 'react';

import { useTheme, Modal, ModalStack, ModalBody, ScaleFade, utils } from '@davidscicluna/component-library';

import { useConst, Center, Show } from '@chakra-ui/react';

import { Transition } from 'framer-motion';

import { useUserTheme } from '../../common/hooks';

import SplashscreenLabel from './components/SplashscreenLabel';
import { SplashscreenProps } from './types';
import SplashscreenLogo from './components/SplashscreenLogo';

const { getTransitionConfig, getTransitionDelay, getTransitionDuration, getColor } = utils;

const labelWidth = 166.45;
const labelHeight = 18;

const Splashscreen: FC<SplashscreenProps> = ({ isOpen = false, onClose }) => {
	const theme = useTheme();

	const { colorMode } = useUserTheme();

	const delay = useConst<number>(getTransitionDelay({ theme, duration: 'ultra-slow' }) * 5);
	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'slow' }));
	const config = useConst<Transition>({ ...getTransitionConfig({ theme }), duration, delay });

	return (
		<Modal isOpen={isOpen} closeOnEsc={false} closeOnOverlayClick={false} onClose={onClose} size='full' spacing={0}>
			<ModalStack>
				<ModalBody background={getColor({ theme, colorMode, type: 'background' })} sx={{ transition: 'none' }}>
					<Center width='100%' height='100vh'>
						{/* Top Label */}
						<Center position='absolute' top={0} left='50%' transform='translateX(-50%)' p={2}>
							<ScaleFade in transition={{ enter: { ...config }, exit: { ...config } }}>
								<SplashscreenLabel colorMode={colorMode} />
							</ScaleFade>
						</Center>

						{/* Bottom Label */}
						<Center
							position='absolute'
							bottom={0}
							left='50%'
							transform='translateX(-50%) rotate(-180deg)'
							p={2}
						>
							<ScaleFade in transition={{ enter: { ...config }, exit: { ...config } }}>
								<SplashscreenLabel colorMode={colorMode} />
							</ScaleFade>
						</Center>

						{/* Left Label */}
						<Show breakpoint='(min-width: 600px)'>
							<Center
								position='absolute'
								top='50%'
								left={-(labelWidth / 2 - labelHeight / 2)}
								transform='translateY(-50%) rotate(-90deg)'
								p={2}
							>
								<ScaleFade in transition={{ enter: { ...config }, exit: { ...config } }}>
									<SplashscreenLabel colorMode={colorMode} />
								</ScaleFade>
							</Center>

							{/* Right Label */}
							<Center
								position='absolute'
								top='50%'
								right={-(labelWidth / 2 - labelHeight / 2)}
								transform='translateY(-50%) rotate(-270deg)'
								p={2}
							>
								<ScaleFade in transition={{ enter: { ...config }, exit: { ...config } }}>
									<SplashscreenLabel colorMode={colorMode} />
								</ScaleFade>
							</Center>
						</Show>

						<SplashscreenLogo />
					</Center>
				</ModalBody>
			</ModalStack>
		</Modal>
	);
};

export default Splashscreen;
