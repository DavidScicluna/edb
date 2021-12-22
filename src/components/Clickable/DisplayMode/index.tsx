import React, { ReactElement } from 'react';

import { useTheme, ButtonGroup } from '@chakra-ui/react';
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
import IconButton from '../IconButton';

const DisplayMode = (): ReactElement => {
  const theme = useTheme<Theme>();

  const dispatch = useDispatch();
  const displayMode = useSelector((state) => state.app.ui.displayMode);
  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <ButtonGroup isAttached>
      <IconButton
        aria-label={displayMode === 'grid' ? 'Display is in Grid Mode' : 'Set display mode to Grid Mode'}
        color={displayMode === 'grid' ? color : 'gray'}
        onClick={displayMode !== 'grid' ? () => dispatch(toggleDisplayMode('grid')) : undefined}
        variant='outlined'
        sx={{
          back: { borderRadius: `${theme.radii.base} 0 0 ${theme.radii.base}` },
          front: { borderRadius: `${theme.radii.base} 0 0 ${theme.radii.base}` }
        }}
      >
        {displayMode === 'grid' ? <GridOnTwoToneIcon /> : <GridOnOutlinedIcon />}
      </IconButton>
      <IconButton
        aria-label={displayMode === 'list' ? 'Display is in List Mode' : 'Set display mode to List Mode'}
        color={displayMode === 'list' ? color : 'gray'}
        onClick={displayMode !== 'list' ? () => dispatch(toggleDisplayMode('list')) : undefined}
        variant='outlined'
        sx={{
          back: { borderRadius: `0 ${theme.radii.base} ${theme.radii.base} 0` },
          front: { borderRadius: `0 ${theme.radii.base} ${theme.radii.base} 0` }
        }}
      >
        {displayMode === 'list' ? <ViewAgendaTwoToneIcon /> : <ViewAgendaOutlinedIcon />}
      </IconButton>
    </ButtonGroup>
  );
};

export default DisplayMode;
