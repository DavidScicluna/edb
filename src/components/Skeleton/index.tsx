import { ReactElement } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { ColorMode, useColorMode, Skeleton as CUISkeleton } from '@chakra-ui/react';

import { handleConvertStringToNumber } from '../../common/utils';

import { SkeletonProps } from './types';

const Skeleton = (props: SkeletonProps): ReactElement => {
	const theme = useTheme();
	const { colorMode: colorModeHook } = useColorMode();

	const {
		children,
		color = 'gray',
		colorMode: colorModeProp,
		isLoaded = false,
		type = 'default',
		speed = undefined,
		...rest
	} = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const handleReturnColors = (type: 'start' | 'end'): string => {
		return theme.colors[color][
			colorMode === 'light' ? (type === 'start' ? 200 : 300) : type === 'start' ? 700 : 600
		];
	};

	return (
		<CUISkeleton
			{...rest}
			isLoaded={isLoaded}
			fadeDuration={
				type === 'default' && !isLoaded
					? handleConvertStringToNumber(theme.transition.duration['normal'], 'ms') / 1000 || 0.25
					: 0
			}
			speed={speed || handleConvertStringToNumber(theme.transition.duration['slower'], 'ms') / 1000 || 0.75}
			startColor={handleReturnColors('start')}
			endColor={handleReturnColors('end')}
		>
			{children}
		</CUISkeleton>
	);
};

export default Skeleton;
