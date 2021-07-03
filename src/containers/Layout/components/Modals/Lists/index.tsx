import React, { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, useMediaQuery, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../../common/hooks/useSelectorTyped';
import utils from '../../../../../common/utils/utils';
import Button from '../../../../../components/Inputs/Button';
import Modal from '../../../../../components/Modal';
import { defaultListsModal, setLists, toggleList } from '../../../../../store/slices/User';
import { List as ListType } from '../../../../../store/slices/User/types';
import CreateList from './components/CreateList';
import List from './components/List';

const ListsModal = (): ReactElement => {
  const { isOpen: isListsOpen, onOpen: onListsOpen, onClose: onListsClose } = useDisclosure();
  const { isOpen: isCreateListOpen, onOpen: onCreateListOpen, onClose: onCreateListClose } = useDisclosure();
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const dispatch = useDispatch();
  const listsModal = useSelector((state) => state.user.ui.listsModal);
  const lists = useSelector((state) => state.user.data.lists);
  const color = useSelector((state) => state.user.ui.theme.color);

  const [selected, setSelected] = useState<ListType['id'][]>([]);

  const handleIsSelected = (id: string, isSelected: boolean): void => {
    if (isSelected) {
      setSelected(selected.filter((list) => list !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSaveItem = (): void => {
    if (listsModal.item && listsModal.item.id && listsModal.item.mediaType) {
      let updatedLists: ListType[] = [...lists];

      const id = listsModal.item.id;
      const mediaType = listsModal.item.mediaType;

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

      setSelected([]);
      dispatch(setLists([...updatedLists]));
      handleClose();
    }
  };

  const handleClose = (): void => {
    dispatch(toggleList({ ...defaultListsModal }));
    onListsClose();
  };

  useEffect(() => {
    if (listsModal.open) {
      onListsOpen();
    } else {
      handleClose();
    }
  }, [listsModal.open]);

  return (
    <>
      <Modal
        title={`Add ${listsModal.item ? listsModal.item.title : 'this item'} to a list`}
        actions={
          selected.length > 0 ? (
            <Button color={utils.handleReturnColor(color)} onClick={() => handleSaveItem()} size='sm'>
              {`Save to List${selected.length > 1 ? 's' : ''}`}
            </Button>
          ) : (
            <Button color={utils.handleReturnColor(color)} onClick={() => onCreateListOpen()} size='sm'>
              Create a new List
            </Button>
          )
        }
        isOpen={isListsOpen}
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

export default ListsModal;
