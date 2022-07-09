import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useConst, Box as CUIBox, BoxProps as AnimationProps } from '@chakra-ui/react';

import { Transition, motion } from 'framer-motion';

const Box = motion(CUIBox);

const { getTransitionDuration, getTransitionEasings } = utils;

// TODO: Maybe convert animation to SlideFade/Slide
const Animation: FC<AnimationProps> = ({ children }) => {
	const theme = useTheme();

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'ultra-slow' }));
	const easing = useConst<number[]>(getTransitionEasings({ theme }));

	const config = useConst<Transition>({ duration, easing });

	return (
		<Box initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ...config }}>
			{children}
		</Box>
	);
};

export default Animation;
