import React, { ReactElement, useEffect } from 'react';

import { useTheme, useColorMode, useDisclosure, VStack, Box, Icon, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../../common/hooks/useSelectorTyped';
import Modal from '../../../../../components/Modal';
import { toggleConfirm, defaultConfirmModal } from '../../../../../store/slices/Modals';
import { Theme } from '../../../../../theme/types';

const ConfirmModal = (): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const confirmModal = useSelector((state) => state.modals.ui.confirmModal);
  const color = useSelector((state) => state.user.ui.theme.color);

  const handleClose = (): void => {
    dispatch(toggleConfirm({ ...defaultConfirmModal }));
    onClose();
  };

  useEffect(() => {
    if (confirmModal.open) {
      onOpen();
    } else {
      handleClose();
    }
  }, [confirmModal.open]);

  return (
    <Modal
      title={confirmModal.title}
      actions={confirmModal.submitButton}
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      size='md'>
      <VStack spacing={2} p={2}>
        <Box borderRadius='lg' p={2} sx={{ backgroundColor: `${color}.50`, color: `${color}.400` }}>
          <Icon
            as={confirmModal.icon}
            sx={{ fontSize: `${theme.fontSizes['6xl']} !important`, color: `${color}.400` }}
          />
        </Box>
        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='lg' fontWeight='normal'>
          {confirmModal.description}
        </Text>
      </VStack>
    </Modal>
  );
};

export default ConfirmModal;
