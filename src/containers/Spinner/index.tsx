import { FC } from 'react';

import { useTheme, Modal, ModalStack, ModalBody, ScaleFade, SlideFade, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, useConst, Center, Show } from '@chakra-ui/react';

import { Transition } from 'framer-motion';

import { useUserTheme } from '../../common/hooks';

import SpinnerLabel from './components/SpinnerLabel';
import { SpinnerProps } from './types';
import SpinnerLogo from './components/SpinnerLogo';

const { getTransitionConfig, getTransitionDuration, getColor } = utils;

const labelWidth = 258.22;
const labelHeight = 18;

const Spinner: FC<SpinnerProps> = ({ isOpen = false, onClose }) => {
	const theme = useTheme();

	const { colorMode } = useUserTheme();

	const logoOffsetY = useBreakpointValue({
		'base': '20vw',
		'sm': '15vw',
		'md': '10vw',
		'lg': '7.5vw',
		'xl': '7.5vw',
		'2xl': '5vw'
	});

	const delayLogo = useConst<number>(0.5);
	const delayLabel = useConst<number>(1);

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'slow' }));
	const config = useConst<Transition>({ ...getTransitionConfig({ theme }), duration });

	return (
		<Modal isOpen={isOpen} closeOnEsc={false} closeOnOverlayClick={false} onClose={onClose} size='full' spacing={0}>
			<ModalStack>
				<ModalBody background={getColor({ theme, colorMode, type: 'background' })} sx={{ transition: 'none' }}>
					<Center width='100%' height='100vh'>
						{/* Top */}
						<Center position='absolute' top={0} left='50%' transform='translateX(-50%)' p={2}>
							<ScaleFade in transition={{ enter: { ...config, delay: delayLabel }, exit: { ...config } }}>
								<SpinnerLabel colorMode={colorMode} />
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
							<ScaleFade in transition={{ enter: { ...config, delay: delayLabel }, exit: { ...config } }}>
								<SpinnerLabel colorMode={colorMode} />
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
									transition={{ enter: { ...config, delay: delayLabel }, exit: { ...config } }}
								>
									<SpinnerLabel colorMode={colorMode} />
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
									transition={{ enter: { ...config, delay: delayLabel }, exit: { ...config } }}
								>
									<SpinnerLabel colorMode={colorMode} />
								</ScaleFade>
							</Center>
						</Show>

						<SlideFade
							in
							transition={{ enter: { ...config, delay: delayLogo }, exit: { ...config } }}
							offsetY={logoOffsetY}
						>
							<SpinnerLogo />
						</SlideFade>
					</Center>
				</ModalBody>
			</ModalStack>
		</Modal>
	);
};

export default Spinner;
