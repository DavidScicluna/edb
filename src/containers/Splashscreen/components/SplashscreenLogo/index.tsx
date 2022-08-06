import React, { FC, useState, useCallback } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst, AspectRatio, Center } from '@chakra-ui/react';

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

	const [ref, { width }] = useElementSize();

	const [isAnimatingStart, setIsAnimatingStart] = useBoolean();
	const [isAnimatingFull, setIsAnimatingFull] = useBoolean();

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

	useTimeout(() => setIsAnimatingStart.on(), 2500);
	useTimeout(() => {
		setIsAnimatingStart.off();
		setIsAnimatingFull.on();
	}, 5000);

	useInterval(() => handlePickColor(), isAnimatingFull ? 500 : null);

	return (
		<AspectRatio ref={ref} width='25vw' ratio={1 / 1}>
			<Center
				sx={{
					...merge(style.logo, {
						color: getColor({
							theme,
							colorMode,
							type:
								isAnimatingFull || isAnimatingStart
									? 'background'
									: colorMode === 'light'
									? 'darkest'
									: 'lightest'
						}),
						backgroundColor:
							isAnimatingStart || isAnimatingFull
								? getColor({
										theme,
										colorMode,
										color: isAnimatingFull ? color : 'gray',
										type: isAnimatingFull ? 'color' : colorMode === 'light' ? 'darkest' : 'lightest'
								  })
								: 'transparent',
						fontSize: `${round(width / 2.5)}px`
					})
				}}
			>
				edb
			</Center>
		</AspectRatio>
	);
};

export default SplashscreenLogo;
