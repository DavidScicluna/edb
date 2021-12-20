import { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../common/hooks';
import Button from '../../../../../components/Clickable/Button';
import Link from '../../../../../components/Clickable/Link';
import Empty from '../../../../../components/Empty';
import Modal from '../../../../../components/Modal';
import { defaultQuickViewModal, toggleQuickView } from '../../../../../store/slices/Modals';
import Movie from './components/Movie';
import Person from './components/Person';

const QuickView = (): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const dispatch = useDispatch();
  const quickViewModal = useSelector((state) => state.modals.ui.quickViewModal);
  const color = useSelector((state) => state.user.ui.theme.color);

  const handleClose = (): void => {
    dispatch(toggleQuickView({ ...defaultQuickViewModal }));
  };

  return (
    <Modal
      title={
        !isSm ? `Quick View ${quickViewModal.mediaItem ? `"${quickViewModal.mediaItem.title}"` : ''}` : 'Quick View'
      }
      actions={
        <Link to={{ pathname: `/${quickViewModal.mediaType}/${quickViewModal.mediaItem?.id}` }}>
          <Button color={color} onClick={() => handleClose()} size='sm'>
            View full details
          </Button>
        </Link>
      }
      isOpen={quickViewModal.open}
      onClose={() => handleClose()}
      isCentered
      size='3xl'
    >
      {quickViewModal.mediaType === 'movie' ? (
        <Movie id={quickViewModal.mediaItem?.id} />
      ) : quickViewModal.mediaType === 'tv' ? (
        <h1>Hello TV Shows</h1>
      ) : quickViewModal.mediaType === 'person' ? (
        <Person id={quickViewModal.mediaItem?.id} />
      ) : (
        <Empty
          label='Oh no! Media-Item not found!'
          description='Sorry, unfortunatly couldnt find the media-item to quick view'
        />
      )}
    </Modal>
  );
};

export default QuickView;
