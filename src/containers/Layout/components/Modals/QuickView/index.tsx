import React, { ReactElement } from 'react';

import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../common/hooks';
import utils from '../../../../../common/utils/utils';
import Button from '../../../../../components/Clickable/Button';
import Link from '../../../../../components/Clickable/Link';
import Modal from '../../../../../components/Modal';
import { defaultQuickViewModal, toggleQuickView } from '../../../../../store/slices/Modals';
import Person from './components/Person';

const QuickView = (): ReactElement => {
  const dispatch = useDispatch();
  const quickViewModal = useSelector((state) => state.modals.ui.quickViewModal);
  const color = useSelector((state) => state.user.ui.theme.color);

  const handleClose = (): void => {
    dispatch(toggleQuickView({ ...defaultQuickViewModal }));
  };

  return (
    <Modal
      title={`Quick View ${quickViewModal.mediaItem ? `"${quickViewModal.mediaItem.title}"` : 'Unknown'}`}
      actions={
        <Link to={{ pathname: `/${quickViewModal.mediaType}/${quickViewModal.mediaItem?.id}` }}>
          <Button color={utils.handleReturnColor(color)} onClick={() => handleClose()} size='sm'>
            View full details
          </Button>
        </Link>
      }
      isOpen={quickViewModal.open}
      onClose={() => handleClose()}
      isCentered
      size='2xl'>
      {quickViewModal.mediaType === 'movie' ? (
        <h1>Hello Movies</h1>
      ) : quickViewModal.mediaType === 'tv' ? (
        <h1>Hello TV Shows</h1>
      ) : quickViewModal.mediaType === 'person' ? (
        <Person id={quickViewModal.mediaItem?.id} />
      ) : (
        <h1>Hello Movies</h1>
      )}
    </Modal>
  );
};

export default QuickView;
