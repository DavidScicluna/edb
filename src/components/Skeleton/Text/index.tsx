import { ReactElement } from 'react';

import { SlideFade, useTheme } from '@chakra-ui/react';

import _ from 'lodash';

import { SkeletonTextProps } from './types';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../common/utils';
import { Theme } from '../../../theme/types';
import Skeleton from '../../Skeleton';
import commonProps from '../common/props';

const SkeletonText = (props: SkeletonTextProps): ReactElement => {
	const theme = useTheme<Theme>();

	const { children, height, fontSize, isLoaded = false, ...rest } = props;

	const handleReturnOffsetY = (): number => {
		if (fontSize) {
			const pixels = handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes[fontSize], 'rem'));

			return _.round(pixels / 2);
		} else {
			return 8;
		}
	};

	return (
		<Skeleton {...rest} {...commonProps} isLoaded={isLoaded} height={height || 'auto'} type='text'>
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
