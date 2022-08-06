import { FC } from 'react';

import { useTheme, Modal, ModalBody, ScaleFade, SlideFade, utils } from '@davidscicluna/component-library';

import { useConst, Center, Show } from '@chakra-ui/react';

import { round } from 'lodash';

import { useUserTheme } from '../../common/hooks';

import Label from './components/Label';
import { SplashscreenProps } from './types';
import Logo from './components/SplashscreenLogo';

const { getColor, getTransitionDelay } = utils;

const labelWidth = 166.45;
const labelHeight = 18;

const Splashscreen: FC<SplashscreenProps> = ({ isOpen = false, onClose }) => {
	const theme = useTheme();

	const { colorMode } = useUserTheme();

	const delayLogo = useConst<number>(round(getTransitionDelay({ theme, duration: 'normal' }) * 2.5));
	const delayLabel = useConst<number>(round(getTransitionDelay({ theme, duration: 'normal' }) * 5));

	return (
		<Modal isOpen={isOpen} closeOnEsc={false} closeOnOverlayClick={false} onClose={onClose} size='full' spacing={0}>
			<ModalBody backgroundColor={getColor({ theme, colorMode, type: 'background' })} sx={{ transition: 'none' }}>
				<Center width='100%' height='100vh'>
					{/* Top */}
					<Center position='absolute' top={0} left='50%' transform='translateX(-50%)' p={2}>
						<SlideFade in transition={{ enter: { delay: delayLabel } }}>
							<Label colorMode={colorMode} />
						</SlideFade>
					</Center>

					{/* Bottom */}
					<Center
						position='absolute'
						bottom={0}
						left='50%'
						transform='translateX(-50%) rotate(-180deg)'
						p={2}
					>
						<SlideFade in transition={{ enter: { delay: delayLabel } }}>
							<Label colorMode={colorMode} />
						</SlideFade>
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
							<SlideFade in transition={{ enter: { delay: delayLabel } }}>
								<Label colorMode={colorMode} />
							</SlideFade>
						</Center>

						{/* Right */}
						<Center
							position='absolute'
							top='50%'
							right={-(labelWidth / 2 - labelHeight / 2)}
							transform='translateY(-50%) rotate(-270deg)'
							p={2}
						>
							<SlideFade in transition={{ enter: { delay: delayLabel } }}>
								<Label colorMode={colorMode} />
							</SlideFade>
						</Center>
					</Show>

					<ScaleFade in transition={{ enter: { delay: delayLogo } }}>
						<Logo />
					</ScaleFade>
				</Center>
			</ModalBody>
		</Modal>
	);
};

export default Splashscreen;
