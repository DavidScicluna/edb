import { FC } from 'react';

import { ButtonGroup, Tooltip, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';

import { useSelector, useUserTheme } from '../../../common/hooks';
import { toggleDisplayMode } from '../../../store/slices/App';

import { DisplayModeProps } from './types';

const DisplayMode: FC<DisplayModeProps> = ({ isDisabled, ...rest }) => {
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const displayMode = useSelector((state) => state.app.ui.displayMode);

	const [isHoveringGrid, setIsHoveringGrid] = useBoolean();
	const [isHoveringList, setIsHoveringList] = useBoolean();

	return (
		<ButtonGroup>
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
				label={displayMode === 'grid' ? 'Display-mode set to Grid mode' : 'Switch display-mode to Grid mode'}
			>
				<IconButton
					{...rest}
					color={displayMode === 'grid' ? color : 'gray'}
					colorMode={colorMode}
					isActive={displayMode === 'grid'}
					onMouseEnter={() => setIsHoveringGrid.on()}
					onMouseLeave={() => setIsHoveringGrid.off()}
					onClick={displayMode === 'list' ? () => dispatch(toggleDisplayMode('grid')) : undefined}
					variant='outlined'
				>
					<IconButtonIcon icon='grid_on' category='outlined' />
				</IconButton>
			</Tooltip>

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
				label={displayMode === 'list' ? 'Display-mode set to List mode' : 'Switch display-mode to List mode'}
			>
				<IconButton
					{...rest}
					color={displayMode === 'list' ? color : 'gray'}
					colorMode={colorMode}
					isActive={displayMode === 'list'}
					onMouseEnter={() => setIsHoveringList.on()}
					onMouseLeave={() => setIsHoveringList.off()}
					onClick={displayMode === 'grid' ? () => dispatch(toggleDisplayMode('list')) : undefined}
					variant='outlined'
				>
					<IconButtonIcon icon='view_agenda' category='outlined' />
				</IconButton>
			</Tooltip>
		</ButtonGroup>
	);
};

export default DisplayMode;
