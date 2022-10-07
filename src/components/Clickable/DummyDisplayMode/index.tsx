import { FC } from 'react';

import { ButtonGroup, DummyIconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useSelector, useUserTheme } from '../../../common/hooks';

import { DummyDisplayModeProps } from './types';

const DummyDisplayMode: FC<DummyDisplayModeProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const displayMode = useSelector((state) => state.app.ui.displayMode);

	return (
		<ButtonGroup>
			<DummyIconButton
				{...props}
				color={displayMode === 'grid' ? color : 'gray'}
				colorMode={colorMode}
				variant='outlined'
			>
				<IconButtonIcon icon='grid_on' category='outlined' />
			</DummyIconButton>

			<DummyIconButton
				{...props}
				color={displayMode === 'list' ? color : 'gray'}
				colorMode={colorMode}
				variant='outlined'
			>
				<IconButtonIcon icon='view_agenda' category='outlined' />
			</DummyIconButton>
		</ButtonGroup>
	);
};

export default DummyDisplayMode;
