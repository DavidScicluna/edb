import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { Transition, motion } from 'framer-motion';

import { PageTransitionProps } from './types';

const { convertREMToPixels, convertStringToNumber, getTransitionConfig, getTransitionDuration } = utils;

const PageTransition: FC<PageTransitionProps> = ({ children }) => {
	const theme = useTheme();

	const duration = useConst(getTransitionDuration({ theme, duration: 'ultra-slow' }));
	const config = useConst<Transition>({ ...getTransitionConfig({ theme }), duration });

	const blur = useConst<number>(convertREMToPixels(convertStringToNumber(theme.space[2], 'rem')));

	return (
		<motion.div
			// ref={ref}
			initial={{
				width: '100%',
				transform: 'scale(1.025)',
				filter: `blur(${blur}px)`,
				opacity: 0
			}}
			animate={{
				width: '100%',
				transform: 'scale(1)',
				filter: 'blur(0px)',
				opacity: 1
			}}
			exit={{
				width: '100%',
				transform: 'scale(1.025)',
				filter: `blur(${blur}px)`,
				opacity: 0
			}}
			transition={{ ...config }}
		>
			{children}
		</motion.div>
	);
};

export default PageTransition;
