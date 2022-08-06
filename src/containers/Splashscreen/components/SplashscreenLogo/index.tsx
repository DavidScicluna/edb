import React, { FC, useState, useCallback } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, useBoolean, useConst, AspectRatio, Center } from '@chakra-ui/react';

import { includes, merge, round, sample } from 'lodash';
import { useElementSize, useInterval, useTimeout } from 'usehooks-ts';

import { color as defaultColor } from '../../../../common/data/defaultPropValues';
import { useUserTheme } from '../../../../common/hooks';

import useStyles from './common/styles';
import { SplashscreenLogoColor } from './types';

const colors: SplashscreenLogoColor[] = [
	'red',
	'pink',
	'purple',
	'deep_purple',
	'indigo',
	'blue',
	'light_blue',
	'cyan',
	'teal',
	'green',
	'light_green',
	'lime',
	'yellow',
	'orange',
	'deep_orange'
];

const { getColor } = utils;

const SplashscreenLogo: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const logoMaxWidth = useBreakpointValue({
		'base': '50vw',
		'sm': '40vw',
		'md': '30vw',
		'lg': '25vw',
		'xl': '25vw',
		'2xl': '20vw'
	});

	const [ref, { width: logoWidth }] = useElementSize();

	const [isAnimatingMiddle, setIsAnimatingMiddle] = useBoolean();
	const [isAnimatingEnd, setIsAnimatingEnd] = useBoolean();

	const sampledColor = useConst<SplashscreenLogoColor>(sample(colors) || defaultColor);

	const [color, setColor] = useState<SplashscreenLogoColor>(sampledColor);
	const [usedColors, setUsedColors] = useState<SplashscreenLogoColor[]>([sampledColor]);

	const style = useStyles({ theme });

	const handlePickColor = useCallback(() => {
		if (usedColors.length === colors.length) {
			setColor(sampledColor);
			setUsedColors([sampledColor]);
		} else {
			setColor(sample(colors.filter((c) => c !== color && includes(usedColors, color))) || color);
			setUsedColors((usedColors) => [...usedColors, color]);
		}
	}, [colors, color, usedColors, sampledColor]);

	useTimeout(() => setIsAnimatingMiddle.on(), 1000);
	useTimeout(() => {
		setIsAnimatingMiddle.off();
		setIsAnimatingEnd.on();
	}, 2500);

	useInterval(() => handlePickColor(), isAnimatingEnd ? 500 : null);

	return (
		<AspectRatio ref={ref} width={logoMaxWidth} ratio={1 / 1}>
			<Center
				sx={{
					...merge(style.logo, {
						color:
							isAnimatingMiddle || isAnimatingEnd
								? getColor({
										theme,
										colorMode,
										type:
											isAnimatingEnd || isAnimatingMiddle
												? 'background'
												: colorMode === 'light'
												? 'darkest'
												: 'lightest'
								  })
								: 'transparent',
						backgroundColor:
							isAnimatingMiddle || isAnimatingEnd
								? getColor({
										theme,
										colorMode,
										color: isAnimatingEnd ? color : 'gray',
										type: isAnimatingEnd ? 'color' : colorMode === 'light' ? 'darkest' : 'lightest'
								  })
								: 'transparent',
						fontSize: isAnimatingMiddle || isAnimatingEnd ? `${round(logoWidth / 2.5)}px` : '2000%'
					})
				}}
			>
				edb
			</Center>
		</AspectRatio>
	);
};

export default SplashscreenLogo;
