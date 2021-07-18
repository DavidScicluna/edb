import React, { ReactElement, useEffect } from 'react';

import {
  useColorMode,
  useDisclosure,
  Modal as CUIModal,
  ModalContent,
  ModalBody,
  VStack,
  Box,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

const MotionBox = motion(Box);

import useSelector from '../../../../../common/hooks/useSelectorTyped';
import { toggleSplashscreen } from '../../../../../store/slices/Modals';
import useStyles from './styles';

const Splashscreen = (): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const isSplashscreenOpen = useSelector((state) => state.modals.ui.isSplashscreenOpen);

  const style = useStyles();

  const handleClose = (): void => {
    const hasSplashscreenRendered = Boolean(JSON.parse(sessionStorage.getItem('hasSplashscreenRendered') || 'false'));

    dispatch(toggleSplashscreen(false));

    onClose();

    if (!hasSplashscreenRendered) {
      sessionStorage.setItem('hasSplashscreenRendered', JSON.stringify(true));
    }
  };

  useEffect(() => {
    if (isSplashscreenOpen) {
      onOpen();

      setTimeout(() => handleClose(), 5000);
    } else {
      handleClose();
    }
  }, [isSplashscreenOpen]);

  return (
    <CUIModal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount
      preserveScrollBarGap
      motionPreset='scale'
      scrollBehavior='inside'
      size='full'>
      <ModalContent backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'} borderRadius='none' m={0}>
        <ModalBody zIndex={10000} p={0}>
          <VStack width='100%' height='100vh' justifyContent='space-between' p={3}>
            <Text
              align='center'
              color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
              fontSize='sm'
              fontWeight='medium'>
              Entertainment database
            </Text>
            <MotionBox
              animate={{ backgroundPosition: ['0%', '25%', '50%', '75%', '100%', '75%', '50%', '25%', '0%'] }}
              transition={{
                duration: 5,
                ease: [0.76, 0, 0.24, 1],
                repeat: 'Infinity',
                repeatType: 'loop',
                repeatDelay: 1
              }}
              bgSize='500%'
              bgGradient='linear(to-r, red.400, orange.400, yellow.400, green.400, teal.400, blue.400, cyan.400, purple.400, pink.400, red.400, orange.400, yellow.400, green.400, teal.400, blue.400, cyan.400, purple.400, pink.400, red.400, red.400, orange.400, yellow.400, green.400, teal.400, blue.400, cyan.400, purple.400, pink.400, red.400)'
              bgClip='text'
              sx={{ ...style }}>
              edb
            </MotionBox>
            <Text
              align='center'
              color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
              fontSize='sm'
              fontWeight='medium'>
              Loading...
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </CUIModal>
  );
};

export default Splashscreen;
