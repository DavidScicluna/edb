import { ReactElement, useEffect } from 'react';

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import {
  ColorMode,
  useTheme,
  useColorMode,
  useMediaQuery,
  useBoolean,
  Modal as CUIModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  HStack,
  Text
} from '@chakra-ui/react';
import { useTimeout } from 'usehooks-ts';

import { handleConvertStringToNumber } from '../../common/utils';
import { Theme } from '../../theme/types';
import Button from '../Clickable/Button';
import IconButton from '../Clickable/IconButton';
import { ModalProps } from './types';

const Modal = (props: ModalProps): ReactElement | null => {
  const theme = useTheme<Theme>();
  const { colorMode: colorModeHook } = useColorMode();

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

  const colorMode: ColorMode = colorModeProp || colorModeHook;
  const transition = `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`;

  useTimeout(
    () => setIsMounted.off(),
    !isOpen ? handleConvertStringToNumber(theme.transition.duration.faster, 'ms') : null
  );

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
        backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}
        borderRadius={size === 'full' || (isSm && !isConfirm) ? 'none' : 'xl'}
        m={isSm && isConfirm ? 2 : 0}
        sx={{ transition }}>
        <ModalHeader
          borderBottom='solid2'
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          px={2}
          py={1.5}
          sx={{ transition }}>
          <HStack justifyContent='space-between'>
            {typeof title === 'string' ? (
              <Text
                align='left'
                fontSize='xl'
                fontWeight='semibold'
                color={colorMode === 'light' ? 'gray.900' : 'gray.50'}>
                {title}
              </Text>
            ) : (
              title
            )}

            <IconButton
              aria-label='Close modal?'
              colorMode={colorMode}
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
            borderTop='solid2'
            borderTopColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
            p={2}
            sx={{ transition }}>
            <Button colorMode={colorMode} onClick={() => onClose()} size='sm' variant='outlined'>
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
