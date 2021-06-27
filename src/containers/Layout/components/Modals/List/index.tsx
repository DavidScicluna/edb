import React, { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, useMediaQuery, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../../common/hooks/useSelectorTyped';
import Button from '../../../../../components/Inputs/Button';
import Modal from '../../../../../components/Modal';
import { defaultListModal, setLists, toggleList } from '../../../../../store/slices/User';
import { List as ListType } from '../../../../../store/slices/User/types';
import CreateList from './components/CreateList';
import List from './components/List';

const ListModal = (): ReactElement => {
  const { isOpen: isListOpen, onOpen: onListOpen, onClose: onListClose } = useDisclosure();
  const { isOpen: isCreateListOpen, onOpen: onCreateListOpen, onClose: onCreateListClose } = useDisclosure();
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const dispatch = useDispatch();
  const listModal = useSelector((state) => state.user.data.listModal);
  const lists = useSelector((state) => state.user.data.lists);

  const [selected, setSelected] = useState<ListType['id'][]>([]);

  const handleIsSelected = (id: string, isSelected: boolean): void => {
    if (isSelected) {
      setSelected(selected.filter((list) => list !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSaveItem = (): void => {
    if (listModal.item && listModal.item.id && listModal.item.mediaType) {
      let updatedLists: ListType[] = [...lists];

      const id = listModal.item.id;
      const mediaType = listModal.item.mediaType;

      selected.forEach((list) => {
        updatedLists = updatedLists.map((updatedList) =>
          updatedList.id === list
            ? {
                ...updatedList,
                date: moment(new Date()).toISOString(),
                results: [...updatedList.results, { id, mediaType }]
              }
            : updatedList
        );
      });

      dispatch(setLists([...updatedLists]));
      handleClose();
    }
  };

  const handleClose = (): void => {
    dispatch(toggleList({ ...defaultListModal }));
    onListClose();
  };

  useEffect(() => {
    if (listModal.open) {
      onListOpen();
    } else {
      onListClose();
    }
  }, [listModal.open]);

  return (
    <>
      <Modal
        title={`Add ${listModal.item ? listModal.item.title : 'this item'} to a list`}
        actions={
          selected.length > 0 ? (
            <Button color='blue' onClick={() => handleSaveItem()} size='sm'>
              {`Save to List${selected.length > 1 ? 's' : ''}`}
            </Button>
          ) : (
            <Button color='blue' onClick={() => onCreateListOpen()} size='sm'>
              Create a new List
            </Button>
          )
        }
        isOpen={isListOpen}
        onClose={handleClose}
        isCentered
        size={isXs ? 'full' : '2xl'}>
        <VStack spacing={2} p={2}>
          {lists.map((list) => (
            <List key={list.id} {...list} isSelected={selected.includes(list.id)} onClick={handleIsSelected} />
          ))}
        </VStack>
      </Modal>

      <CreateList isOpen={isCreateListOpen} onClose={onCreateListClose} />
    </>
  );
};

export default ListModal;
