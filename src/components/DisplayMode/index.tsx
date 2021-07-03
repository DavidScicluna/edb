import React, { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import {
  GridOnOutlined as GridOnOutlinedIcon,
  GridOnTwoTone as GridOnTwoToneIcon,
  ListAltOutlined as ListAltOutlinedIcon,
  ListAltTwoTone as ListAltTwoToneIcon
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import useSelector from '../../common/hooks/useSelectorTyped';
import utils from '../../common/utils/utils';
import { toggleDisplayMode } from '../../store/slices/App';
import IconButton from '../Inputs/IconButton';
import Tooltip from '../Tooltip';

const DisplayMode = (): ReactElement => {
  const dispatch = useDispatch();
  const displayMode = useSelector((state) => state.app.ui.displayMode);
  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <HStack spacing={1}>
      <Tooltip label='Set display-mode to Grid' placement='bottom'>
        <IconButton
          aria-label='Toggle grid display-mode'
          color={displayMode === 'grid' ? utils.handleReturnColor(color) : 'gray'}
          icon={displayMode === 'grid' ? GridOnTwoToneIcon : GridOnOutlinedIcon}
          onClick={displayMode !== 'grid' ? () => dispatch(toggleDisplayMode('grid')) : undefined}
          size='sm'
          variant='outlined'
        />
      </Tooltip>
      <Tooltip label='Set display-mode to List' placement='bottom'>
        <IconButton
          aria-label='Toggle list display-mode'
          color={displayMode === 'list' ? utils.handleReturnColor(color) : 'gray'}
          icon={displayMode === 'list' ? ListAltTwoToneIcon : ListAltOutlinedIcon}
          onClick={displayMode !== 'list' ? () => dispatch(toggleDisplayMode('list')) : undefined}
          size='sm'
          variant='outlined'
        />
      </Tooltip>
    </HStack>
  );
};

export default DisplayMode;
