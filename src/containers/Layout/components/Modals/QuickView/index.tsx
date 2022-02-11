import { ReactElement } from 'react';

import { useMediaQuery, Center } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../common/hooks';
import { handleReturnMediaTypeLabel } from '../../../../../common/utils';
import Button from '../../../../../components/Clickable/Button';
import Link from '../../../../../components/Clickable/Link';
import Empty from '../../../../../components/Empty';
import Modal from '../../../../../components/Modal';
import { defaultQuickViewModal, toggleQuickView } from '../../../../../store/slices/Modals';
import Collection from './View/Collection';
import Movie from './View/Movie';
import Person from './View/Person';

const QuickView = (): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const dispatch = useDispatch();
  const quickViewModal = useSelector((state) => state.modals.ui.quickViewModal);

  const handleClose = (): void => {
    dispatch(toggleQuickView({ ...defaultQuickViewModal }));
  };

  return (
    <Modal
      title={
        !isSm ? `Quick View ${quickViewModal.mediaItem ? `"${quickViewModal.mediaItem.title}"` : ''}` : 'Quick View'
      }
      renderActions={({ color, colorMode, size }) => (
        <Link
          to={{ pathname: `/${handleReturnMediaTypeLabel(quickViewModal.mediaType)}/${quickViewModal.mediaItem?.id}` }}
        >
          <Button color={color} colorMode={colorMode} onClick={() => handleClose()} size={size}>
            View full details
          </Button>
        </Link>
      )}
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
      ) : quickViewModal.mediaType === 'collection' ? (
        <Collection id={quickViewModal.mediaItem?.id} />
      ) : (
        <Center width='100%' p={2}>
          <Empty
            label='Oh no! Media-Item not found!'
            description='Sorry, unfortunatly couldnt find the media-item to quick view'
          />
        </Center>
      )}
    </Modal>
  );
};

export default QuickView;
