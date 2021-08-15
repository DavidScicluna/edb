import React, { ReactElement, useState } from 'react';

import { useDisclosure, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../../common/hooks/useSelectorTyped';
import utils from '../../../../../common/utils/utils';
import Button from '../../../../../components/Clickable/Button';
import Modal from '../../../../../components/Modal';
import { defaultListsModal, toggleList } from '../../../../../store/slices/Modals';
import { ListModal as ListModalType } from '../../../../../store/slices/Modals/types';
import { setLists } from '../../../../../store/slices/User';
import { List as ListType } from '../../../../../store/slices/User/types';
import CreateList from './components/CreateList';
import List from './components/List';

const ListsModal = (): ReactElement => {
  const { isOpen: isCreateListOpen, onOpen: onCreateListOpen, onClose: onCreateListClose } = useDisclosure();

  const dispatch = useDispatch();
  const listsModal: ListModalType = useSelector((state) => state.modals.ui.listsModal);
  const lists: ListType[] = useSelector((state) => state.user.data.lists);
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
    if (listsModal.mediaItem && listsModal.mediaItem.id && listsModal.mediaType) {
      let updatedLists: ListType[] = [...lists];

      selected.forEach((list) => {
        updatedLists = updatedLists.map((updatedList) => {
          const results = { ...updatedList.results };

          switch (listsModal.mediaType) {
            case 'movie': {
              const movieMediaItem: any = { ...listsModal.mediaItem, dateAdded: moment(new Date()).toISOString() };

              results.movies = [...results.movies, movieMediaItem];
              break;
            }
            case 'tv': {
              const showMediaItem: any = { ...listsModal.mediaItem, dateAdded: moment(new Date()).toISOString() };

              results.tv = [...results.tv, showMediaItem];
              break;
            }
            default:
              break;
          }

          return updatedList.id === list
            ? {
                ...updatedList,
                date: moment(new Date()).toISOString(),
                results: { ...results }
              }
            : updatedList;
        });
      });

      setSelected([]);

      dispatch(setLists([...updatedLists]));
      dispatch(toggleList({ ...defaultListsModal }));
    }
  };

  return (
    <>
      <Modal
        title={`Add "${listsModal.title} to a list`}
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
        isOpen={listsModal.open}
        onClose={() => dispatch(toggleList({ ...defaultListsModal }))}
        isCentered
        size='2xl'>
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
