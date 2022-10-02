import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../common/hooks';

import { DummyDisplayModeProps } from './types';

const DummyDisplayMode: FC<DummyDisplayModeProps> = (props) => {
	const { colorMode } = useUserTheme();

	return (
		<DummyButton {...props} colorMode={colorMode} hasLeft hasRight variant='outlined'>
			|
		</DummyButton>
	);
};

export default DummyDisplayMode;
