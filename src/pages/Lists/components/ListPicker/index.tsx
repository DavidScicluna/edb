import { ReactElement } from 'react';

import { Box, SimpleGrid } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import Modal from '../../../../components/Modal';
import ListItem from './components/ListItem';
import { ListPickerProps } from './types';

const MediaTypePicker = ({ activeList, isOpen, onClose }: ListPickerProps): ReactElement => {
  const lists = useSelector((state) => state.user.data.lists);

  return (
    <Modal title='Select list' isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
      <Box width='100%' height='100%' p={3}>
        <SimpleGrid width='100%' columns={[1, 2, 3, 3, 3]} spacing={2}>
          {lists.map((list) => (
            <ListItem key={list.id} {...list} isActive={list.id === activeList?.id || false} onClose={onClose} />
          ))}
        </SimpleGrid>
      </Box>
    </Modal>
  );
};

export default MediaTypePicker;
