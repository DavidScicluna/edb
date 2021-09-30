import { ReactElement } from 'react';

import { Text } from '@chakra-ui/react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../common/hooks';
import Button from '../../../../../components/Clickable/Button';
import Modal from '../../../../../components/Modal';
import { toggleConfirm } from '../../../../../store/slices/Modals';

const ConfirmModal = (): ReactElement => {
  const dispatch = useDispatch();
  const confirmModal = useSelector((state) => state.modals.ui.confirmModal);

  const buttonProps = JSON.parse(confirmModal.stringifiedButtonProps || '');

  return (
    <Modal
      title={confirmModal.title}
      actions={
        <Button {..._.omit({ ...buttonProps }, 'label')} size='sm'>
          {buttonProps?.label || ''}
        </Button>
      }
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
