import { FC } from 'react';

import { Icon } from '@davidscicluna/component-library';

import { TrendingTabIconProps } from './types';

const TrendingTabIcon: FC<TrendingTabIconProps> = ({ color, colorMode, height, ...rest }) => {
	return (
		<Icon
			{...rest}
			width={`${height}px`}
			height={`${height}px`}
			fontSize={`${height}px`}
			colorMode={colorMode}
			skeletonColor={color}
		/>
	);
};

export default TrendingTabIcon;
