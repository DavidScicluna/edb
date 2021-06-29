import React, { ReactElement, useEffect } from 'react';

import { useDisclosure, useMediaQuery, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../../common/hooks/useSelectorTyped';
import Button from '../../../../../components/Inputs/Button';
import Modal from '../../../../../components/Modal';
import { toggleDisplay } from '../../../../../store/slices/User';

const Display = (): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const dispatch = useDispatch();
  const isDisplayModalOpen = useSelector((state) => state.user.data.isDisplayModalOpen);

  const handleClose = (): void => {
    dispatch(toggleDisplay(false));
    onClose();
  };

  useEffect(() => {
    if (isDisplayModalOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [isDisplayModalOpen]);

  return (
    <Modal
      title='Edit Application Theme'
      actions={
        <Button color='blue' size='sm'>
          Save
        </Button>
      }
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      size={isXs ? 'full' : '2xl'}>
      <VStack spacing={2} p={2}></VStack>
    </Modal>
  );
};

export default Display;
