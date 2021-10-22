import React, { ReactElement } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { DeleteOutlineOutlined as DeleteOutlineOutlinedIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../../../../../common/hooks';
import Button from '../../../../../../../../../components/Clickable/Button';
import IconButton from '../../../../../../../../../components/Clickable/IconButton';
import ConfirmModal from '../../../../../../../../../components/ConfirmModal';
import { setUserReviews } from '../../../../../../../../../store/slices/User';

const DeleteReview = ({ id }: { id: string }): ReactElement => {
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.user.data.reviews.user);

  const handleDelete = (): void => {
    dispatch(setUserReviews(userReviews.filter((review) => review.id !== id)));
    onCloseConfirm();
  };

  return (
    <>
      <IconButton
        aria-label='Delete review'
        icon={DeleteOutlineOutlinedIcon}
        onClick={() => onOpenConfirm()}
        size='sm'
      />

      <ConfirmModal
        renderButton={
          <Button color='red' onClick={() => handleDelete()} size='sm'>
            Delete
          </Button>
        }
        title='Delete review'
        description='Are you sure you want to delete the review? You will not be able to retrieve this review back!'
        isOpen={isConfirmOpen}
        onClose={onCloseConfirm}
      />
    </>
  );
};

export default DeleteReview;
