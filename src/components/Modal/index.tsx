import React, { ReactElement } from 'react';

import {
  useColorMode,
  useMediaQuery,
  Modal as CUIModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  HStack,
  Text
} from '@chakra-ui/react';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import Button from '../Clickable/Button';
import IconButton from '../Clickable/IconButton';
import { ModalProps } from './types';

const Modal = (props: ModalProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const { children, actions, title, isOpen, onClose, size, ...rest } = props;

  return (
    <CUIModal
      {...rest}
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount
      preserveScrollBarGap
      motionPreset='scale'
      scrollBehavior='inside'
      size={isXs ? 'full' : size}>
      <ModalOverlay />
      <ModalContent
        backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}
        borderRadius={size === 'full' ? 'none' : 'xl'}
        mx={0}>
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

            <IconButton aria-label='Close modal?' icon={CloseOutlinedIcon} onClick={() => onClose()} variant='icon' />
          </HStack>
        </ModalHeader>
        <ModalBody p={0}>{children}</ModalBody>
        {actions ? (
          <ModalFooter
            justifyContent='space-between'
            px={3}
            py={1.5}
            borderTop='solid2'
            borderTopColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}>
            <Button onClick={() => onClose()} size='xs' variant='outlined'>
              Cancel
            </Button>
            {actions}
          </ModalFooter>
        ) : null}
      </ModalContent>
    </CUIModal>
  );
};

export default Modal;
