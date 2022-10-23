import { FC } from 'react';

import { ButtonGroup, ButtonGroupItem, DummyIconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useSelector, useUserTheme } from '../../../common/hooks';

import { DummyDisplayModeProps } from './types';

const DummyDisplayMode: FC<DummyDisplayModeProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const displayMode = useSelector((state) => state.app.ui.displayMode);

	return (
		<ButtonGroup>
			<ButtonGroupItem index={0} total={1}>
				<DummyIconButton
					{...props}
					aria-label={
						displayMode === 'grid' ? 'Display-mode set to Grid mode' : 'Switch display-mode to Grid mode'
					}
					color={displayMode === 'grid' ? color : 'gray'}
					colorMode={colorMode}
					variant='outlined'
				>
					<IconButtonIcon icon='grid_on' category='outlined' />
				</DummyIconButton>
			</ButtonGroupItem>

			<ButtonGroupItem index={1} total={1}>
				<DummyIconButton
					{...props}
					aria-label={
						displayMode === 'list' ? 'Display-mode set to List mode' : 'Switch display-mode to List mode'
					}
					color={displayMode === 'list' ? color : 'gray'}
					colorMode={colorMode}
					variant='outlined'
				>
					<IconButtonIcon icon='view_agenda' category='outlined' />
				</DummyIconButton>
			</ButtonGroupItem>
		</ButtonGroup>
	);
};

export default DummyDisplayMode;
