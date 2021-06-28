import React, { ReactElement } from 'react';

import { useMediaQuery, Box, VStack, HStack } from '@chakra-ui/react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import Modal from '../../../../components/Modal';
import { List } from '../../../../store/slices/User/types';
import ListItem from './components/ListItem';
import { ListPickerProps } from './types';

const MediaTypePicker = ({ activeList, isOpen, onClose }: ListPickerProps): ReactElement => {
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const history = useHistory();

  const lists = useSelector((state) => state.user.data.lists);

  const handleClick = (id: List['id']): void => {
    history.push({
      pathname: `/bookmarks/${id}`,
      search: queryString.stringify({ ...queryString.parse(history.location.search) })
    });

    onClose();
  };

  return (
    <Modal title='Select list' isOpen={isOpen} onClose={onClose} isCentered size={isXs ? 'full' : '2xl'}>
      <Box width='100%' height='100%' p={3}>
        {isXs ? (
          <VStack justifyContent='space-between' spacing={2}>
            {lists.map((list) => (
              <ListItem key={list.id} {...list} isActive={list.id === activeList?.id || false} onClick={handleClick} />
            ))}
          </VStack>
        ) : (
          <HStack justifyContent='space-between' spacing={2}>
            {lists.map((list) => (
              <ListItem key={list.id} {...list} isActive={list.id === activeList?.id || false} onClick={handleClick} />
            ))}
          </HStack>
        )}
      </Box>
    </Modal>
  );
};

export default MediaTypePicker;
