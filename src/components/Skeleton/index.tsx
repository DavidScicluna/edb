import { ReactElement } from 'react';

import { ColorMode, useTheme, useColorMode, Skeleton as CUISkeleton } from '@chakra-ui/react';

import { handleReturnColors } from './common/utils';
import { SkeletonProps } from './types';

import { handleConvertStringToNumber } from '../../common/utils';
import { Theme } from '../../theme/types';

const Skeleton = (props: SkeletonProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const {
		children,
		color = 'gray',
		colorMode: colorModeProp,
		isLoaded = false,
		type = 'default',
		speed,
		...rest
	} = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	return (
		<CUISkeleton
			{...rest}
			isLoaded={isLoaded}
			fadeDuration={
				type === 'default' && !isLoaded
					? handleConvertStringToNumber(theme.transition.duration['normal'], 'ms') || 250
					: 0
			}
			speed={speed || handleConvertStringToNumber(theme.transition.duration['slower'], 'ms') || 750}
			startColor={handleReturnColors(theme, 'start', color, colorMode)}
			endColor={handleReturnColors(theme, 'end', color, colorMode)}
		>
			{children}
		</CUISkeleton>
	);
};

export default Skeleton;
