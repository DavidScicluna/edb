import { FC } from 'react';

import { Icon } from '@davidscicluna/component-library';

import { TabIconProps } from './types';

const TabIcon: FC<TabIconProps> = ({ color, colorMode, height = 0, ...rest }) => {
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

export default TabIcon;
