import React, { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../../components/Clickable/Button';
import ConfirmModal from '../../../../components/ConfirmModal';
import { setLists } from '../../../../store/slices/User/';
import { DeleteListProps } from './types';

const DeleteList = (props: DeleteListProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const dispatch = useDispatch();
  const lists = useSelector((state) => state.user.data.lists);

  const { id, label, isOpen, onClose, onCloseToast } = props;

  const handleDelete = (): void => {
    dispatch(setLists(lists.filter((paramList) => paramList.id !== id)));

    onClose();
    onCloseToast();
  };

  return (
    <ConfirmModal
      renderButton={
        <Button color='red' onClick={() => handleDelete()} size='sm'>
          Delete
        </Button>
      }
      title={isSm ? 'Delete' : `Delete ${label ? `"${label}"` : ''} list`}
      description={`Are you sure you want to delete the ${
        label ? `"${label}"` : ''
      } list? You will not be able to retrieve this list back!`}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default DeleteList;
