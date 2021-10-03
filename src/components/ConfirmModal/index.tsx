import { ReactElement } from 'react';

import { Text } from '@chakra-ui/react';

import Modal from '../Modal';
import { ConfirmModalProps } from './types';

const ConfirmModal = (props: ConfirmModalProps): ReactElement => {
  const { renderButton, title, description, isOpen = false, onClose } = props;

  return (
    <Modal title={title} actions={renderButton} isConfirm isOpen={isOpen} isCentered onClose={onClose} size='md'>
      <Text align='left' fontSize='md' fontWeight='normal' p={2}>
        {description}
      </Text>
    </Modal>
  );
};

export default ConfirmModal;
