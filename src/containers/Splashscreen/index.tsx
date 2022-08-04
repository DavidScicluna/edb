import { FC, useState, useCallback } from 'react';

import { useTheme, Modal, ModalBody, SlideFade, utils, Slide } from '@davidscicluna/component-library';

import { useConst, Center, Show } from '@chakra-ui/react';

import { useEffectOnce, useInterval } from 'usehooks-ts';

import { useUserTheme } from '../../common/hooks';

import Label from './components/Label';
import Letter from './components/Letter';
import { SplashscreenColor, SplashscreenProps } from './types';
import { ColorLetters, setColors } from './common/utils';

// OLD Gradient Animation
// const MotionBox = motion(Box);
// <MotionBox
// animate={{
// 	backgroundPosition: [
// 		...range(0, 101, 1).map((number) => `${number}%`),
// 		...reverse(range(0, 101, 1).map((number) => `${number}%`))
// 	]
// }}
// transition={{
// 	duration: 5,
// 	ease: [0.76, 0, 0.24, 1],
// 	repeat: Infinity
// }}
// bgSize='500%'
// bgGradient={`linear(to-r, ${colors.map((color) => `${color}.400`).join(', ')})`}
// bgClip='text'
// sx={{ ...style }}
// >
// edb
// </MotionBox>

const { getColor, getTransitionDelay } = utils;

const logo = 'edb';

const Splashscreen: FC<SplashscreenProps> = ({ isOpen = false, onClose }) => {
	const theme = useTheme();

	const { colorMode } = useUserTheme();

	const [colorE, setColorE] = useState<string>('');
	const enterDelayE = useConst<number>(getTransitionDelay({ theme, duration: 'normal' }) * 2);
	const letterDelayE = useConst<number>(getTransitionDelay({ theme, duration: 'normal' }) * 2);

	const [colorD, setColorD] = useState<string>('');
	const enterDelayD = useConst<number>(getTransitionDelay({ theme, duration: 'normal' }) * 3);
	const letterDelayD = useConst<number>(getTransitionDelay({ theme, duration: 'normal' }) * 3);

	const [colorB, setColorB] = useState<string>('');
	const enterDelayB = useConst<number>(getTransitionDelay({ theme, duration: 'normal' }) * 4);
	const letterDelayB = useConst<number>(getTransitionDelay({ theme, duration: 'normal' }) * 4);

	const delayLabel = useConst<number>(getTransitionDelay({ theme, duration: 'normal' }) * 5);

	const handleSetColors = useCallback(() => {
		const colors = setColors({ colorE, colorD, colorB } as ColorLetters);

		setColorE(colors.colorE);
		setColorD(colors.colorD);
		setColorB(colors.colorB);
	}, [colorE, colorD, colorB]);

	useInterval(() => handleSetColors(), 1000);

	useEffectOnce(() => handleSetColors());

	return (
		<Modal isOpen={isOpen} closeOnEsc={false} closeOnOverlayClick={false} onClose={onClose} size='full' spacing={0}>
			<ModalBody backgroundColor={getColor({ theme, colorMode, type: 'background' })} sx={{ transition: 'none' }}>
				<Center width='100%' height='100vh'>
					{/* Top */}
					<Center position='absolute' top={0} left='50%' transform='translateY(-50%)'>
						<Slide direction='top' in transition={{ enter: { delay: delayLabel } }}>
							<Center p={2}>
								<Label colorMode={colorMode} />
							</Center>
						</Slide>
					</Center>

					{/* Bottom */}
					<Center position='absolute' bottom={0} left='50%' transform='translateY(-50%)'>
						<Slide direction='bottom' in transition={{ enter: { delay: delayLabel } }}>
							<Center p={2}>
								<Label colorMode={colorMode} />
							</Center>
						</Slide>
					</Center>

					<Show breakpoint='(min-width: 600px)'>
						{/* Left */}
						<Slide direction='left' in transition={{ enter: { delay: delayLabel } }}>
							<Center
								position='absolute'
								top='50%'
								left={`-${theme.space[10]}`}
								transform='translateY(-50%) rotate(-90deg)'
								p={2}
							>
								<Label colorMode={colorMode} />
							</Center>
						</Slide>

						{/* Right */}
						<Slide direction='right' in transition={{ enter: { delay: delayLabel } }}>
							<Center
								position='absolute'
								top='50%'
								right={`-${theme.space[10]}`}
								transform='translateY(-50%) rotate(-270deg)'
								p={2}
							>
								<Label colorMode={colorMode} />
							</Center>
						</Slide>
					</Show>

					<Center letterSpacing='0.5px'>
						{logo.split('').map((letter, index) => (
							<SlideFade
								key={index}
								in
								transition={{
									enter: {
										delay: index === 0 ? enterDelayE : index === 1 ? enterDelayD : enterDelayB
									}
								}}
							>
								<Letter
									letter={letter}
									color={(index === 0 ? colorE : index === 1 ? colorD : colorB) as SplashscreenColor}
									colorMode={colorMode}
									delay={index === 0 ? letterDelayE : index === 1 ? letterDelayD : letterDelayB}
								/>
							</SlideFade>
						))}
					</Center>
				</Center>
			</ModalBody>
		</Modal>
	);
};

export default Splashscreen;
