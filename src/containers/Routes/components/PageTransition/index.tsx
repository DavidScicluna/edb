import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { Transition, motion } from 'framer-motion';

import { PageTransitionProps } from './types';

const { getTransitionDuration, getTransitionEasings } = utils;

// TODO: Maybe convert PageTransition to SlideFade/Slide
const PageTransition: FC<PageTransitionProps> = ({ children }) => {
	const theme = useTheme();

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'ultra-slow' }));
	const easing = useConst<number[]>(getTransitionEasings({ theme }));

	const config = useConst<Transition>({ duration, easing });

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ...config }}>
			{children}
		</motion.div>
	);
};

export default PageTransition;
