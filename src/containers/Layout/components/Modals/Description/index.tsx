import React, { ReactElement, useEffect } from 'react';

import { useColorMode, useDisclosure, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../../common/hooks/useSelectorTyped';
import utils from '../../../../../common/utils/utils';
import Button from '../../../../../components/Clickable/Button';
import Modal from '../../../../../components/Modal';
import { defaultDescriptionModal, toggleDescription } from '../../../../../store/slices/Modals';

const DescriptionModal = (): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const descriptionModal = useSelector((state) => state.modals.ui.descriptionModal);
  const color = useSelector((state) => state.user.ui.theme.color);

  const handleClose = (): void => {
    dispatch(toggleDescription({ ...defaultDescriptionModal }));
    onClose();
  };

  useEffect(() => {
    if (descriptionModal.open) {
      onOpen();
    } else {
      handleClose();
    }
  }, [descriptionModal.open]);

  return (
    <Modal
      title={`${descriptionModal.mediaItem ? `"${descriptionModal.mediaItem.title}"` : 'Unknown'} description`}
      actions={
        // TODO: Add Link to view item
        <Button color={utils.handleReturnColor(color)} onClick={() => handleClose()} size='xs'>
          {`View ${descriptionModal.mediaItem ? `"${descriptionModal.mediaItem.title}"` : ''}`}
        </Button>
      }
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      size='2xl'>
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
        fontSize='lg'
        fontWeight='normal'
        px={3}
        py={2}>
        {descriptionModal.mediaItem ? descriptionModal.mediaItem.description : 'N/A'}
      </Text>
    </Modal>
  );
};

export default DescriptionModal;
