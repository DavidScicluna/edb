import { FC } from 'react';

import { Skeleton, Icon } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../common/hooks';

import { DummyPasswordIconProps } from './types';

const DummyPasswordIcon: FC<DummyPasswordIconProps> = (props) => {
	const { colorMode } = useUserTheme();

	return (
		<Skeleton colorMode={colorMode} isLoaded={false} variant='rectangle'>
			<Icon {...props} colorMode={colorMode} icon='visibility_off' category='outlined' />
		</Skeleton>
	);
};

export default DummyPasswordIcon;
