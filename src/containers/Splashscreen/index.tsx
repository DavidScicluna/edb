import { FC, useState, useCallback } from 'react';

import { useTheme, Modal, ModalBody, SlideFade, utils } from '@davidscicluna/component-library';

import { useConst, Center } from '@chakra-ui/react';

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
	const delayE = useConst<number>(getTransitionDelay({ theme, duration: 'normal' }) * 2);

	const [colorD, setColorD] = useState<string>('');
	const delayD = useConst<number>(getTransitionDelay({ theme, duration: 'normal' }) * 3);

	const [colorB, setColorB] = useState<string>('');
	const delayB = useConst<number>(getTransitionDelay({ theme, duration: 'normal' }) * 4);

	const handleSetColors = useCallback(() => {
		const colors = setColors({ colorE, colorD, colorB } as ColorLetters);

		setColorE(colors.colorE);
		setColorD(colors.colorD);
		setColorB(colors.colorB);
	}, [colorE, colorD, colorB]);

	// useInterval(() => handleSetColors(), 1000);
	useInterval(() => handleSetColors(), 5000);

	useEffectOnce(() => handleSetColors());

	return (
		<Modal closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='full'>
			<ModalBody backgroundColor={getColor({ theme, colorMode, type: 'background' })}>
				<Center width='100%' height='100vh' p={2} sx={{ letterSpacing: '0.5px' }}>
					{/* Top & Bottom */}
					<Label colorMode={colorMode} position='absolute' top={theme.space[2]} />
					<Label colorMode={colorMode} position='absolute' bottom={theme.space[2]} />

					{/* Left & Right */}
					<Label
						colorMode={colorMode}
						position='absolute'
						top='50%'
						left={`-${(181.02 - 48) / 2}`}
						transform='translateY(-50%) rotate(-90deg)'
					/>
					<Label
						colorMode={colorMode}
						position='absolute'
						top='50%'
						right={`-${(181.02 - 48) / 2}`}
						transform='translateY(-50%) rotate(-270deg)'
					/>

					{logo.split('').map((letter, index) => (
						<SlideFade
							key={index}
							in
							transition={{ enter: { delay: index === 0 ? delayE : index === 1 ? delayD : delayB } }}
						>
							<Letter
								letter={letter}
								color={(index === 0 ? colorE : index === 1 ? colorD : colorB) as SplashscreenColor}
								colorMode={colorMode}
							/>
						</SlideFade>
					))}
				</Center>
			</ModalBody>
		</Modal>
	);
};

export default Splashscreen;
