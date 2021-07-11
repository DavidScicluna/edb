import React, { ReactElement, useEffect } from 'react';

import { useColorMode, useDisclosure, Modal as CUIModal, ModalContent, ModalBody, Center, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

const MotionBox = motion(Box);

import useSelector from '../../../../../common/hooks/useSelectorTyped';
import { toggleSplashscreen } from '../../../../../store/slices/User';
import useStyles from './styles';

const Splashscreen = (): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const isSplashscreenOpen = useSelector((state) => state.user.ui.isSplashscreenOpen);

  const style = useStyles();

  const handleClose = (): void => {
    dispatch(toggleSplashscreen(false));

    onClose();
  };

  useEffect(() => {
    if (isSplashscreenOpen) {
      onOpen();
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
      motionPreset='scale'
      scrollBehavior='inside'
      size='full'>
      <ModalContent backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'} borderRadius='none' m={0}>
        <ModalBody p={0}>
          <Center width='100%' height='100vh' p={3}>
            <MotionBox
              animate={{ backgroundPosition: ['0%', '25%', '50%', '75%', '100%', '75%', '50%', '25%', '0%'] }}
              transition={{
                duration: 10,
                ease: 'easeInOut',
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
          </Center>
        </ModalBody>
      </ModalContent>
    </CUIModal>
  );
};

export default Splashscreen;
