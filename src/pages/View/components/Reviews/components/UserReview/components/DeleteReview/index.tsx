import { ReactElement } from 'react';

import { useDisclosure, useBoolean } from '@chakra-ui/react';
import { Trash2 as TrashIcon } from 'react-feather';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../../../../common/hooks';
import Button from '../../../../../../../../components/Clickable/Button';
import IconButton from '../../../../../../../../components/Clickable/IconButton';
import ConfirmModal from '../../../../../../../../components/ConfirmModal';
import Tooltip from '../../../../../../../../components/Tooltip';
import { setUserReviews } from '../../../../../../../../store/slices/User';

const DeleteReview = ({ id }: { id: string }): ReactElement => {
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.user.data.reviews.user);

  const [isHovering, setIsHovering] = useBoolean();

  const handleDelete = (): void => {
    dispatch(setUserReviews(userReviews.filter((review) => review.id !== id)));
    onCloseConfirm();
  };

  return (
    <>
      <Tooltip aria-label='Delete review' label='Delete review' isOpen={isHovering} placement='top' gutter={6}>
        <IconButton
          aria-label='Delete review'
          color={isHovering ? 'red' : 'gray'}
          icon={TrashIcon}
          onClick={() => onOpenConfirm()}
          onMouseEnter={() => setIsHovering.on()}
          onMouseLeave={() => setIsHovering.off()}
          variant='icon'
          size='sm'
        />
      </Tooltip>

      <ConfirmModal
        actions={
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
