import { ReactElement, forwardRef } from 'react';

import {
	ButtonGroupRef as DisplayModeRef,
	ButtonGroupProps as DisplayModeProps,
	ButtonGroup,
	IconButton,
	Icon
} from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useIsFetching, useIsMutating } from 'react-query';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../common/hooks';
import { toggleDisplayMode } from '../../../store/slices/App';
import { defaultUser, getUser } from '../../../store/slices/Users';
import Tooltip from '../../Tooltip';

const DisplayMode = forwardRef<DisplayModeRef, DisplayModeProps>(function DisplayMode(props, ref): ReactElement {
	const dispatch = useDispatch();
	const displayMode = useSelector((state) => state.app.ui.displayMode);
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	const [isHoveringGrid, setIsHoveringGrid] = useBoolean();
	const [isClickingGrid, setIsClickingGrid] = useBoolean();

	const [isHoveringList, setIsHoveringList] = useBoolean();
	const [isClickingList, setIsClickingList] = useBoolean();

	return (
		<ButtonGroup {...props} ref={ref} isAttached>
			<Tooltip
				aria-label={
					displayMode === 'grid'
						? 'Display is in Grid Mode (Tooltip)'
						: 'Set display mode to Grid Mode (Tooltip)'
				}
				isOpen={!(isFetching > 0 || isMutating > 0) && isHoveringGrid}
				isDisabled={isFetching > 0 || isMutating > 0}
				placement='top'
				label={displayMode === 'grid' ? 'Display is in Grid Mode' : 'Set display mode to Grid Mode'}
				gutter={isClickingGrid ? 7 : 10}
			>
				<IconButton
					aria-label={displayMode === 'grid' ? 'Display is in Grid Mode' : 'Set display mode to Grid Mode'}
					color={displayMode === 'grid' ? color : 'gray'}
					isDisabled={isFetching > 0 || isMutating > 0}
					onClick={displayMode !== 'grid' ? () => dispatch(toggleDisplayMode('grid')) : undefined}
					onMouseDown={() => setIsClickingGrid.on()}
					onMouseUp={() => setIsClickingGrid.off()}
					onMouseEnter={() => setIsHoveringGrid.on()}
					onMouseLeave={() => setIsHoveringGrid.off()}
					variant='outlined'
				>
					<Icon icon='grid_on' category={displayMode === 'grid' ? 'filled' : 'outlined'} />
				</IconButton>
			</Tooltip>
			<Tooltip
				aria-label={
					displayMode === 'list'
						? 'Display is in List Mode (Tooltip)'
						: 'Set display mode to List Mode (Tooltip)'
				}
				isOpen={!(isFetching > 0 || isMutating > 0) && isHoveringList}
				isDisabled={isFetching > 0 || isMutating > 0}
				placement='top'
				label={displayMode === 'list' ? 'Display is in List Mode' : 'Set display mode to List Mode'}
				gutter={isClickingList ? 7 : 10}
			>
				<IconButton
					aria-label={displayMode === 'list' ? 'Display is in List Mode' : 'Set display mode to List Mode'}
					color={displayMode === 'list' ? color : 'gray'}
					isDisabled={isFetching > 0 || isMutating > 0}
					onClick={displayMode !== 'list' ? () => dispatch(toggleDisplayMode('list')) : undefined}
					onMouseDown={() => setIsClickingList.on()}
					onMouseUp={() => setIsClickingList.off()}
					onMouseEnter={() => setIsHoveringList.on()}
					onMouseLeave={() => setIsHoveringList.off()}
					variant='outlined'
				>
					<Icon icon='view_agenda' category={displayMode === 'list' ? 'filled' : 'outlined'} />
				</IconButton>
			</Tooltip>
		</ButtonGroup>
	);
});

export default DisplayMode;
