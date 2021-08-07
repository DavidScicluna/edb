import React, { ReactElement } from 'react';

import { useColorMode, Modal, ModalContent, ModalBody, Box, VStack } from '@chakra-ui/react';
import { CloseOutlined as CloseOutlinedIcon } from '@material-ui/icons';

import IconButton from '../../../../../../components/Clickable/IconButton';
import Grid from './components/Grid';
import Image from './components/Image';
import { GalleryProps } from './types';

const Gallery = (props: GalleryProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { isOpen, name, activeIndex, images, onClick, onClose } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount
      preserveScrollBarGap
      motionPreset='scale'
      scrollBehavior='inside'
      size='full'>
      <ModalContent backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'} borderRadius='none' m={0}>
        <ModalBody position='relative' p={0}>
          {/* Close button */}
          <Box position='fixed' top={2} right={2}>
            <IconButton aria-label='Close modal' icon={CloseOutlinedIcon} onClick={() => onClose()} variant='icon' />
          </Box>

          <VStack px={9} py={8}>
            {/* Photos Section */}
            <Grid title='Photos'>
              <>
                {images.map((image, index) => (
                  <Image
                    key={index}
                    image={image}
                    index={index}
                    name={name}
                    isActive={index === activeIndex}
                    onClickImage={onClick}
                  />
                ))}
              </>
            </Grid>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Gallery;
