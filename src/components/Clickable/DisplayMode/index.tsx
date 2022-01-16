import React, { ReactElement } from 'react';

import { useTheme, useBoolean, ButtonGroup } from '@chakra-ui/react';
import {
  ViewAgendaTwoTone as ViewAgendaTwoToneIcon,
  ViewAgendaOutlined as ViewAgendaOutlinedIcon,
  GridOnTwoTone as GridOnTwoToneIcon,
  GridOnOutlined as GridOnOutlinedIcon
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../common/hooks';
import { toggleDisplayMode } from '../../../store/slices/App';
import { Theme } from '../../../theme/types';
import Tooltip from '../../Tooltip';
import IconButton from '../IconButton';

const DisplayMode = (): ReactElement => {
  const theme = useTheme<Theme>();

  const dispatch = useDispatch();
  const displayMode = useSelector((state) => state.app.ui.displayMode);
  const color = useSelector((state) => state.user.ui.theme.color);

  const [isHoveringGrid, setIsHoveringGrid] = useBoolean();
  const [isClickingGrid, setIsClickingGrid] = useBoolean();

  const [isHoveringList, setIsHoveringList] = useBoolean();
  const [isClickingList, setIsClickingList] = useBoolean();

  return (
    <ButtonGroup isAttached>
      <Tooltip
        aria-label={
          displayMode === 'grid' ? 'Display is in Grid Mode (Tooltip)' : 'Set display mode to Grid Mode (Tooltip)'
        }
        isOpen={isHoveringGrid}
        placement='top'
        label={displayMode === 'grid' ? 'Display is in Grid Mode' : 'Set display mode to Grid Mode'}
        gutter={isClickingGrid ? 7 : 10}
      >
        <IconButton
          aria-label={displayMode === 'grid' ? 'Display is in Grid Mode' : 'Set display mode to Grid Mode'}
          color={displayMode === 'grid' ? color : 'gray'}
          onClick={displayMode !== 'grid' ? () => dispatch(toggleDisplayMode('grid')) : undefined}
          onMouseDown={() => setIsClickingGrid.on()}
          onMouseUp={() => setIsClickingGrid.off()}
          onMouseEnter={() => setIsHoveringGrid.on()}
          onMouseLeave={() => setIsHoveringGrid.off()}
          variant='outlined'
          sx={{
            back: { borderRadius: `${theme.radii.base} 0 0 ${theme.radii.base}` },
            front: { borderRadius: `${theme.radii.base} 0 0 ${theme.radii.base}` }
          }}
        >
          {displayMode === 'grid' ? <GridOnTwoToneIcon /> : <GridOnOutlinedIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip
        aria-label={
          displayMode === 'list' ? 'Display is in List Mode (Tooltip)' : 'Set display mode to List Mode (Tooltip)'
        }
        isOpen={isHoveringList}
        placement='top'
        label={displayMode === 'list' ? 'Display is in List Mode' : 'Set display mode to List Mode'}
        gutter={isClickingList ? 7 : 10}
      >
        <IconButton
          aria-label={displayMode === 'list' ? 'Display is in List Mode' : 'Set display mode to List Mode'}
          color={displayMode === 'list' ? color : 'gray'}
          onClick={displayMode !== 'list' ? () => dispatch(toggleDisplayMode('list')) : undefined}
          onMouseDown={() => setIsClickingList.on()}
          onMouseUp={() => setIsClickingList.off()}
          onMouseEnter={() => setIsHoveringList.on()}
          onMouseLeave={() => setIsHoveringList.off()}
          variant='outlined'
          sx={{
            back: { borderRadius: `0 ${theme.radii.base} ${theme.radii.base} 0` },
            front: { borderRadius: `0 ${theme.radii.base} ${theme.radii.base} 0` }
          }}
        >
          {displayMode === 'list' ? <ViewAgendaTwoToneIcon /> : <ViewAgendaOutlinedIcon />}
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
};

export default DisplayMode;
