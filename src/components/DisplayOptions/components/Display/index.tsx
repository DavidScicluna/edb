import React, { ReactElement } from 'react';

import { useColorMode, VStack, HStack, Text } from '@chakra-ui/react';
import {
  GridOnOutlined as GridOnOutlinedIcon,
  GridOnTwoTone as GridOnTwoToneIcon,
  ListAltOutlined as ListAltOutlinedIcon,
  ListAltTwoTone as ListAltTwoToneIcon
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import { toggleDisplayMode } from '../../../../store/slices/App';
import IconButton from '../../../Inputs/IconButton';
import Option from './components/Option';

const Display = (): ReactElement => {
  const { colorMode } = useColorMode();

  const dispatch = useDispatch();
  const displayMode = useSelector((state) => state.app.data.displayMode);

  return (
    <VStack width='100%' alignItems='flex-start' justifyContent='center' spacing={1}>
      <Text
        width='100%'
        align='left'
        color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
        fontSize='md'
        fontWeight='semibold'>
        Display Options
      </Text>

      <HStack spacing={3}>
        {/* Grid | List Buttons */}
        <HStack spacing={1}>
          <Option label='Grid' isActive={displayMode === 'grid'}>
            <IconButton
              aria-label={displayMode === 'grid' ? 'Display mode: GRID' : 'Set display mode to Grid'}
              color={displayMode === 'grid' ? 'blue' : 'gray'}
              icon={displayMode === 'grid' ? GridOnTwoToneIcon : GridOnOutlinedIcon}
              onClick={displayMode !== 'grid' ? () => dispatch(toggleDisplayMode('grid')) : undefined}
              size='sm'
              variant='outlined'
            />
          </Option>
          <Option label='List' isActive={displayMode === 'list'}>
            <IconButton
              aria-label={displayMode === 'list' ? 'Display mode: LIST' : 'Set display mode to List'}
              color={displayMode === 'list' ? 'blue' : 'gray'}
              icon={displayMode === 'list' ? ListAltTwoToneIcon : ListAltOutlinedIcon}
              onClick={displayMode !== 'list' ? () => dispatch(toggleDisplayMode('list')) : undefined}
              size='sm'
              variant='outlined'
            />
          </Option>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default Display;
