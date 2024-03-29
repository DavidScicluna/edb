import { FC } from 'react';

import { ButtonGroup, ButtonGroupItem, Tooltip, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { compact } from 'lodash';

import { useSelector, useUserTheme } from '../../../common/hooks';
import { toggleDisplayMode } from '../../../store/slices/App';

import { DisplayModeProps } from './types';

const DisplayMode: FC<DisplayModeProps> = ({ separator, isDisabled, variant = 'outlined', ...rest }) => {
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const displayMode = useSelector((state) => state.app.ui.displayMode);

	const [isHoveringGrid, setIsHoveringGrid] = useBoolean();
	const [isHoveringList, setIsHoveringList] = useBoolean();

	return (
		<ButtonGroup>
			{compact([
				<ButtonGroupItem key='ds-edb-display-mode-grid' index={0} total={separator ? 2 : 1}>
					<Tooltip
						aria-label={
							displayMode === 'grid'
								? 'Display-mode set to Grid mode (tooltip)'
								: 'Switch display-mode to Grid mode (tooltip)'
						}
						colorMode={colorMode}
						isOpen={!isDisabled && isHoveringGrid}
						isDisabled={isDisabled}
						placement='top'
						label={
							displayMode === 'grid'
								? 'Display-mode set to Grid mode'
								: 'Switch display-mode to Grid mode'
						}
					>
						<IconButton
							{...rest}
							aria-label={
								displayMode === 'grid'
									? 'Display-mode set to Grid mode'
									: 'Switch display-mode to Grid mode'
							}
							color={displayMode === 'grid' ? color : 'gray'}
							colorMode={colorMode}
							isActive={displayMode === 'grid'}
							onMouseEnter={() => setIsHoveringGrid.on()}
							onMouseLeave={() => setIsHoveringGrid.off()}
							onClick={displayMode === 'list' ? () => dispatch(toggleDisplayMode('grid')) : undefined}
							variant={variant}
						>
							<IconButtonIcon icon='grid_on' category='outlined' />
						</IconButton>
					</Tooltip>
				</ButtonGroupItem>,

				separator && (
					<ButtonGroupItem key='ds-edb-display-mode-separator' index={1} total={2}>
						{separator}
					</ButtonGroupItem>
				),

				<ButtonGroupItem key='ds-edb-display-mode-list' index={separator ? 2 : 1} total={separator ? 2 : 1}>
					<Tooltip
						aria-label={
							displayMode === 'list'
								? 'Display-mode set to List mode (tooltip)'
								: 'Switch display-mode to List mode (tooltip)'
						}
						colorMode={colorMode}
						isOpen={!isDisabled && isHoveringList}
						isDisabled={isDisabled}
						placement='top'
						label={
							displayMode === 'list'
								? 'Display-mode set to List mode'
								: 'Switch display-mode to List mode'
						}
					>
						<IconButton
							{...rest}
							aria-label={
								displayMode === 'list'
									? 'Display-mode set to List mode'
									: 'Switch display-mode to List mode'
							}
							color={displayMode === 'list' ? color : 'gray'}
							colorMode={colorMode}
							isActive={displayMode === 'list'}
							onMouseEnter={() => setIsHoveringList.on()}
							onMouseLeave={() => setIsHoveringList.off()}
							onClick={displayMode === 'grid' ? () => dispatch(toggleDisplayMode('list')) : undefined}
							variant={variant}
						>
							<IconButtonIcon icon='view_agenda' category='outlined' />
						</IconButton>
					</Tooltip>
				</ButtonGroupItem>
			])}
		</ButtonGroup>
	);
};

export default DisplayMode;
