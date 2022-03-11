import { ReactElement } from 'react';

import { ColorMode, useTheme, useColorMode, Skeleton as CUISkeleton } from '@chakra-ui/react';

import commonProps from './common/props';
import { handleReturnColors } from './common/utils';
import { SkeletonProps } from './types';

import { handleConvertStringToNumber } from '../../common/utils';
import { Theme } from '../../theme/types';

const Skeleton = (props: SkeletonProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const { children, color = 'gray', colorMode: colorModeProp, isLoaded = false, type = 'default', ...rest } = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	return (
		<CUISkeleton
			{...rest}
			{...commonProps}
			isLoaded={isLoaded}
			fadeDuration={
				type === 'default' && !isLoaded
					? handleConvertStringToNumber(theme.transition.duration['normal'], 'ms') / 250
					: 0
			}
			startColor={handleReturnColors(theme, 'start', color, colorMode)}
			endColor={handleReturnColors(theme, 'end', color, colorMode)}
		>
			{children}
		</CUISkeleton>
	);
};

export default Skeleton;
