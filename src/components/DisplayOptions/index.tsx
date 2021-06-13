import React, { ReactElement } from 'react';

import { useColorMode, useDisclosure, Popover, PopoverTrigger, Portal, PopoverContent, VStack } from '@chakra-ui/react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import IconButton from '../Inputs/IconButton';
import Display from './components/Display';
import SortBy from './components/SortBy';
import { DisplayOptionsProps } from './types';

const DisplayOptions = ({ sortBy = [], onSortChange }: DisplayOptionsProps): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Popover isOpen={isOpen} placement='bottom-end' gutter={16} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <IconButton
          aria-label={isOpen ? '' : ''}
          color={isOpen ? 'blue' : 'gray'}
          icon={VisibilityOutlinedIcon}
          onClick={!isOpen ? () => onOpen() : undefined}
          size='sm'
          variant='outlined'
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          width='auto'
          border='solid2'
          borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          borderRadius='lg'
          boxShadow='xl'
          p={2}
          sx={{
            '&:focus': {
              boxShadow: 'none'
            }
          }}>
          <VStack spacing={2}>
            <Display />
            {sortBy.length > 0 && onSortChange ? <SortBy sortBy={sortBy} onSortChange={onSortChange} /> : null}
          </VStack>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default DisplayOptions;
