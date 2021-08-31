import React, { ReactElement, useEffect } from 'react';

import { useMediaQuery, Box, VStack, HStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { useSelector } from '../../../../common/hooks';
import Modal from '../../../../components/Modal';
import ListItem from './components/ListItem';
import { ListPickerProps } from './types';

const MediaTypePicker = ({ activeList, isOpen, onClose }: ListPickerProps): ReactElement => {
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const location = useLocation();

  const lists = useSelector((state) => state.user.data.lists);

  useEffect(() => onClose(), [location]);

  return (
    <Modal title='Select list' isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
      <Box width='100%' height='100%' p={3}>
        {isXs ? (
          <VStack justifyContent='space-between' spacing={3}>
            {lists.map((list) => (
              <ListItem key={list.id} {...list} isActive={list.id === activeList?.id || false} />
            ))}
          </VStack>
        ) : (
          <HStack justifyContent='space-between' spacing={3}>
            {lists.map((list) => (
              <ListItem key={list.id} {...list} isActive={list.id === activeList?.id || false} />
            ))}
          </HStack>
        )}
      </Box>
    </Modal>
  );
};

export default MediaTypePicker;
