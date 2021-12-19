import { ReactElement } from 'react';

import { Text } from '@chakra-ui/react';

import Modal from '../Modal';
import { ConfirmModalProps } from './types';

const ConfirmModal = (props: ConfirmModalProps): ReactElement => {
  const { description, ...rest } = props;

  return (
    <Modal {...rest} isConfirm isCentered size='md'>
      <Text align='left' fontSize='md' fontWeight='normal' p={2}>
        {description}
      </Text>
    </Modal>
  );
};

export default ConfirmModal;
