import React, { ReactElement } from 'react';

import {
  useColorMode,
  useMediaQuery,
  Modal as CUIModal,
  ModalProps as CUIModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  HStack,
  Text
} from '@chakra-ui/react';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import IconButton from '../Inputs/IconButton';

export type ModalProps = { title: string } & CUIModalProps;

const Modal = (props: ModalProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const { children, title, isOpen, onClose, size, ...rest } = props;

  return (
    <CUIModal {...rest} isOpen={isOpen} onClose={onClose} motionPreset='scale' size={size}>
      <ModalOverlay />
      <ModalContent borderRadius={size === 'full' ? 'none' : 'xl'} mx={isXs ? 3 : 0}>
        <ModalHeader
          px={3}
          py={1}
          borderBottom='solid2'
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}>
          <HStack justifyContent='space-between'>
            <Text
              align='left'
              fontSize='xl'
              fontWeight='semibold'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}>
              {title}
            </Text>

            <IconButton
              aria-label='Close type picker modal?'
              icon={CloseOutlinedIcon}
              onClick={() => onClose()}
              size='sm'
              variant='icon'
            />
          </HStack>
        </ModalHeader>
        <ModalBody p={0}>{children}</ModalBody>
      </ModalContent>
    </CUIModal>
  );
};

export default Modal;
