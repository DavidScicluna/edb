import { ReactElement } from 'react';

import { Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../common/hooks';
import Modal from '../../../../../components/Modal';
import { toggleConfirm } from '../../../../../store/slices/Modals';

const ConfirmModal = (): ReactElement => {
  const dispatch = useDispatch();
  const confirmModal = useSelector((state) => state.modals.ui.confirmModal);

  return (
    <Modal
      title={confirmModal.title}
      actions={confirmModal.submitButton}
      isConfirm
      isOpen={confirmModal.open}
      isCentered
      onClose={() => dispatch(toggleConfirm({ ...confirmModal, open: false }))}
      size='md'>
      <Text align='left' fontSize='md' fontWeight='normal' p={2}>
        {confirmModal.description}
      </Text>
    </Modal>
  );
};

export default ConfirmModal;
