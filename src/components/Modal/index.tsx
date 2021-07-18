import React, { ReactElement } from 'react';

import {
  useTheme,
  useMediaQuery,
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

import { ColorMode } from '../../common/types/types';
import { Theme } from '../../theme/types';
import Button from '../Clickable/Button';
import IconButton from '../Clickable/IconButton';
import { ModalProps } from './types';

const Modal = (props: ModalProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const { children, actions, title, colorMode: colorModeProp, isOpen, onClose, size, ...rest } = props;

  const mode: ColorMode = colorModeProp || colorMode;
  const transition = `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`;

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
        backgroundColor={mode === 'light' ? 'gray.50' : 'gray.900'}
        borderRadius={size === 'full' || isXs ? 'none' : 'xl'}
        mx={0}
        sx={{ transition }}>
        <ModalHeader
          px={2}
          py={1.25}
          borderBottom='solid2'
          borderBottomColor={mode === 'light' ? 'gray.200' : 'gray.700'}
          sx={{ transition }}>
          <HStack justifyContent='space-between'>
            <Text align='left' fontSize='xl' fontWeight='semibold' color={mode === 'light' ? 'gray.900' : 'gray.50'}>
              {title}
            </Text>

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
            <Button colorMode={mode} onClick={() => onClose()} size='xs' variant='outlined'>
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
