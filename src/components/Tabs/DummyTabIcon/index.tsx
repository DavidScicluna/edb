import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import TabIcon from '../TabIcon';

import { DummyTabIconProps } from './types';

const DummyTabIcon: FC<DummyTabIconProps> = (props) => {
	return (
		<Skeleton isLoaded={false} variant='rectangle'>
			<TabIcon {...props} />
		</Skeleton>
	);
};

export default DummyTabIcon;
