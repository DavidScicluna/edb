import React, { ReactElement, useEffect } from 'react';

import {
  useTheme,
  useMediaQuery,
  useBoolean,
  Modal as CUIModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  HStack,
  Text,
  useColorMode
} from '@chakra-ui/react';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import useTimeout from '../../common/hooks/useTimeout';
import { ColorMode } from '../../common/types/types';
import { Theme } from '../../theme/types';
import Button from '../Clickable/Button';
import IconButton from '../Clickable/IconButton';
import { ModalProps } from './types';

const Modal = (props: ModalProps): ReactElement | null => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const {
    children,
    actions,
    title,
    colorMode: colorModeProp,
    isConfirm = false,
    isOpen,
    onClose,
    size,
    ...rest
  } = props;

  const [isMounted, setIsMounted] = useBoolean();

  const mode: ColorMode = colorModeProp || colorMode;
  const transition = `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`;

  useTimeout(() => setIsMounted.off(), !isOpen ? 1000 : null);

  useEffect(() => {
    if (isOpen) {
      setIsMounted.on();
    }
  }, [isOpen]);

  return isMounted ? (
    <CUIModal
      {...rest}
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount
      preserveScrollBarGap
      motionPreset='scale'
      scrollBehavior='inside'
      size={isSm && !isConfirm ? 'full' : size}>
      <ModalOverlay />
      <ModalContent
        backgroundColor={mode === 'light' ? 'gray.50' : 'gray.900'}
        borderRadius={size === 'full' || (isSm && !isConfirm) ? 'none' : 'xl'}
        m={isSm && isConfirm ? 2 : 0}
        sx={{ transition }}>
        <ModalHeader
          px={2}
          py={1.25}
          borderBottom='solid2'
          borderBottomColor={mode === 'light' ? 'gray.200' : 'gray.700'}
          sx={{ transition }}>
          <HStack justifyContent='space-between'>
            {typeof title !== 'string' ? (
              title
            ) : (
              <Text align='left' fontSize='xl' fontWeight='semibold' color={mode === 'light' ? 'gray.900' : 'gray.50'}>
                {title}
              </Text>
            )}

            <IconButton
              aria-label='Close modal?'
              colorMode={mode}
              icon={CloseOutlinedIcon}
              onClick={() => onClose()}
              variant='icon'
            />
          </HStack>
        </ModalHeader>
        <ModalBody p={0}>{children}</ModalBody>
        {actions ? (
          <ModalFooter
            justifyContent='space-between'
            p={2}
            borderTop='solid2'
            borderTopColor={mode === 'light' ? 'gray.200' : 'gray.700'}
            sx={{ transition }}>
            <Button colorMode={mode} onClick={() => onClose()} size='sm' variant='outlined'>
              Cancel
            </Button>
            {actions}
          </ModalFooter>
        ) : null}
      </ModalContent>
    </CUIModal>
  ) : null;
};

export default Modal;
