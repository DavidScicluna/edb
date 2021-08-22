import React, { ReactElement, useEffect } from 'react';

import { useColorMode, Modal, ModalContent, ModalBody, VStack, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../../common/hooks/useSelectorTyped';
import { toggleSplashscreen } from '../../../../../store/slices/Modals';
import useStyles from './styles';

const MotionBox = motion(Box);

const Splashscreen = (): ReactElement => {
  const { colorMode } = useColorMode();

  const dispatch = useDispatch();
  const isSplashscreenOpen = useSelector((state) => state.modals.ui.isSplashscreenOpen);

  const style = useStyles();

  useEffect(() => {
    if (isSplashscreenOpen) {
      setTimeout(() => dispatch(toggleSplashscreen(false)), 5000);
    }
  }, [isSplashscreenOpen]);

  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={isSplashscreenOpen}
      onClose={() => dispatch(toggleSplashscreen(false))}
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
              animate={{
                backgroundPosition: [
                  ..._.range(0, 101, 1).map((number) => `${number}%`),
                  ..._.reverse(_.range(0, 101, 1).map((number) => `${number}%`))
                ]
              }}
              transition={{
                duration: 10,
                ease: [0.76, 0, 0.24, 1],
                repeat: Infinity
              }}
              bgSize='500%'
              bgGradient='linear(to-r, red.400, orange.400, yellow.400, green.400, teal.400, blue.400, cyan.400, purple.400, pink.400)'
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
    </Modal>
  );
};

export default Splashscreen;
