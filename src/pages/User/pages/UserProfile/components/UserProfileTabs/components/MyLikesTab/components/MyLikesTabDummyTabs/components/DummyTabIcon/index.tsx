import { FC } from 'react';

import { Skeleton, Icon } from '@davidscicluna/component-library';

import { DummyTabIconProps } from './types';

const DummyTabIcon: FC<DummyTabIconProps> = ({ color, colorMode, height = 0, ...rest }) => {
	return (
		<Skeleton isLoaded={false} variant='rectangle'>
			<Icon
				{...rest}
				width={`${height}px`}
				height={`${height}px`}
				fontSize={`${height}px`}
				colorMode={colorMode}
				skeletonColor={color}
			/>
		</Skeleton>
	);
};

export default DummyTabIcon;
