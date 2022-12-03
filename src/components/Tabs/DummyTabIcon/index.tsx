import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import TabIcon from '../TabIcon';

import { DummyTabIconProps } from './types';

const DummyTabIcon: FC<DummyTabIconProps> = ({ color, colorMode, ...rest }) => {
	return (
		<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='rectangle'>
			<TabIcon {...rest} color={color} colorMode={colorMode} />
		</Skeleton>
	);
};

export default DummyTabIcon;
