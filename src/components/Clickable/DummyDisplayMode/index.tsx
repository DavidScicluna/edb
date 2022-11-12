import { FC } from 'react';

import { ButtonGroup, ButtonGroupItem, DummyIconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { compact } from 'lodash';

import { useSelector, useUserTheme } from '../../../common/hooks';

import { DummyDisplayModeProps } from './types';

const DummyDisplayMode: FC<DummyDisplayModeProps> = ({ separator, variant = 'outlined', ...rest }) => {
	const { color, colorMode } = useUserTheme();

	const displayMode = useSelector((state) => state.app.ui.displayMode);

	return (
		<ButtonGroup>
			{compact([
				<ButtonGroupItem key='ds-edb-dummy-display-mode-grid' index={0} total={separator ? 2 : 1}>
					<DummyIconButton
						{...rest}
						aria-label={
							displayMode === 'grid'
								? 'Display-mode set to Grid mode'
								: 'Switch display-mode to Grid mode'
						}
						color={displayMode === 'grid' ? color : 'gray'}
						colorMode={colorMode}
						variant={variant}
					>
						<IconButtonIcon icon='grid_on' category='outlined' />
					</DummyIconButton>
				</ButtonGroupItem>,

				separator && (
					<ButtonGroupItem key='ds-edb-dummy-display-mode-separator' index={1} total={2}>
						{separator}
					</ButtonGroupItem>
				),

				<ButtonGroupItem
					key='ds-edb-dummy-display-mode-list'
					index={separator ? 2 : 1}
					total={separator ? 2 : 1}
				>
					<DummyIconButton
						{...rest}
						aria-label={
							displayMode === 'list'
								? 'Display-mode set to List mode'
								: 'Switch display-mode to List mode'
						}
						color={displayMode === 'list' ? color : 'gray'}
						colorMode={colorMode}
						variant={variant}
					>
						<IconButtonIcon icon='view_agenda' category='outlined' />
					</DummyIconButton>
				</ButtonGroupItem>
			])}
		</ButtonGroup>
	);
};

export default DummyDisplayMode;
