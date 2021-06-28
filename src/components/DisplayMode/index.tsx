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
import { toggleDisplayMode } from '../../store/slices/App';
import IconButton from '../Inputs/IconButton';
import Tooltip from '../Tooltip';

const DisplayMode = (): ReactElement => {
  const dispatch = useDispatch();
  const displayMode = useSelector((state) => state.app.data.displayMode);

  return (
    <HStack spacing={1}>
      <Tooltip label='Set display-mode to Grid' placement='bottom'>
        <IconButton
          aria-label='Toggle grid display-mode'
          color={displayMode === 'grid' ? 'blue' : 'gray'}
          icon={displayMode === 'grid' ? GridOnTwoToneIcon : GridOnOutlinedIcon}
          onClick={displayMode !== 'grid' ? () => dispatch(toggleDisplayMode('grid')) : undefined}
          size='sm'
          variant='outlined'
        />
      </Tooltip>
      <Tooltip label='Set display-mode to List' placement='bottom'>
        <IconButton
          aria-label='Toggle list display-mode'
          color={displayMode === 'list' ? 'blue' : 'gray'}
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
