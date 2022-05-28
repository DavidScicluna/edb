import { ReactElement } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { SlideFade } from '@chakra-ui/react';
import round from 'lodash/round';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../common/utils';
import Skeleton from '../../Skeleton';

import { SkeletonTextProps } from './types';

const SkeletonText = (props: SkeletonTextProps): ReactElement => {
	const theme = useTheme();

	const { children, height, fontSize, isLoaded = false, ...rest } = props;

	const handleReturnOffsetY = (): number => {
		if (fontSize) {
			const pixels = handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes[fontSize], 'rem'));

			return round(pixels / 2);
		} else {
			return 8;
		}
	};

	return (
		<Skeleton {...rest} isLoaded={isLoaded} height={height || 'auto'} type='text'>
			<SlideFade
				in={isLoaded}
				offsetY={handleReturnOffsetY()}
				delay={handleConvertStringToNumber(theme.transition.duration['faster'], 'ms') / 250}
				style={{ height: 'inherit' }}
			>
				{children}
			</SlideFade>
		</Skeleton>
	);
};

export default SkeletonText;
