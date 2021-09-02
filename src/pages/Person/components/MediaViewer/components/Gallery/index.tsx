import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Modal, ModalContent, ModalHeader, ModalBody, VStack } from '@chakra-ui/react';
import { CloseOutlined as CloseOutlinedIcon } from '@material-ui/icons';

import IconButton from '../../../../../../components/Clickable/IconButton';
import Grid from './components/Grid';
import Image from './components/Image';
import { GalleryProps } from './types';

const Gallery = (props: GalleryProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

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
        <ModalHeader display='flex' justifyContent='flex-end' p={2}>
          {/* Close button */}
          <IconButton aria-label='Close modal' icon={CloseOutlinedIcon} onClick={() => onClose()} variant='icon' />
        </ModalHeader>
        <ModalBody p={0}>
          <VStack width='100%' px={isSm ? 3 : 6} pb={isSm ? 3 : 6}>
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
