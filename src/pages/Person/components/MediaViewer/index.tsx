import React, { ReactElement, useState, useCallback, useEffect } from 'react';

import { useColorMode, useDisclosure, Modal, ModalContent, ModalBody } from '@chakra-ui/react';
import { Swiper } from 'swiper';

import Actions from './components/Actions';
import Gallery from './components/Gallery';
import Navigation from './components/Navigation';
import Viewer from './components/Viewer';
import { MediaViewerProps, NavigationDirection } from './types';

const MediaViewer = (props: MediaViewerProps): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen: isGalleryOpen, onOpen: onGalleryOpen, onClose: onGalleryClose } = useDisclosure();

  const { isOpen, name, selectedImage, images, onClose } = props;

  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  /**
   * This method will slide to the image
   *
   * @param index Number - The index of the image in the list
   * @param speed Number - The speed of the slide transition
   */
  const handleSlideTo = useCallback(
    (index: number, speed: number) => {
      if (swiper) {
        swiper.slideTo(index, speed);
        setActiveIndex(index);
      }
    },
    [swiper]
  );

  /**
   * This method will either slide to the previous slide or to the next slide depending on the direction passed
   *
   * @param direction - Either 'prev' or 'next'
   */
  const handleNavigationClick = (direction: NavigationDirection): void => {
    handleSlideTo(direction === 'prev' ? activeIndex - 1 : activeIndex + 1, 500);
  };

  /**
   * This method will close the gallery and will slide to the index passed
   *
   * @param index Number - The slide index
   */
  const handleGalleryClick = (index: number): void => {
    onGalleryClose();
    handleSlideTo(index, 0);
  };

  useEffect(() => {
    if (swiper && selectedImage) {
      handleSlideTo(images.findIndex((image) => image.file_path === selectedImage.file_path) || 0, 0);
    }
  }, [swiper, selectedImage]);

  return (
    <>
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
            <Actions onClose={onClose} onGalleryClick={() => onGalleryOpen()} />

            <Viewer
              current={activeIndex + 1}
              name={name}
              images={images}
              onSwiper={(swiper) => setSwiper(swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            />

            <Navigation current={activeIndex + 1} total={images.length} onNavigation={handleNavigationClick} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Gallery
        isOpen={isGalleryOpen}
        name={name}
        activeIndex={activeIndex}
        images={images}
        onClick={handleGalleryClick}
        onClose={onGalleryClose}
      />
    </>
  );
};

export default MediaViewer;
