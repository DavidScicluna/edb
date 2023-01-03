import { FC } from 'react';

import { useTheme, ScaleFade, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, useConst, Center } from '@chakra-ui/react';

import { shuffle } from 'lodash';
import { Transition } from 'framer-motion';

import { useUserTheme } from '../../../../common/hooks';

import { colors as defaultColors, size as defaultSize } from './common/data/defaultPropValues';
import useStyles from './common/styles';
import { SplashscreenLogoColors } from './types';

const { getTransitionConfig, getTransitionDuration } = utils;

const SplashscreenLogo: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const size =
		useBreakpointValue({
			'base': 240,
			'sm': 384,
			'md': 496,
			'lg': 640,
			'xl': 768,
			'2xl': 912
		}) || defaultSize;

	const colors = useConst<SplashscreenLogoColors>(
		shuffle(defaultColors.filter((c) => c !== color)).filter((_color, index) => index < 10)
	);

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'ultra-slow' }));
	const config = useConst<Transition>({ ...getTransitionConfig({ theme }), duration });

	const style = useStyles({ theme, color, colors, colorMode, size });

	return (
		<ScaleFade in transition={{ enter: { ...config }, exit: { ...config } }}>
			<Center sx={style.logo}>edb</Center>
		</ScaleFade>
	);
};

export default SplashscreenLogo;
