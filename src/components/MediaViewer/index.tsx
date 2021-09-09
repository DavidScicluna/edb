import React, { ReactElement, useState, useCallback, useEffect } from 'react';

import { useColorMode, useDisclosure, Modal, ModalContent, ModalBody } from '@chakra-ui/react';
import { Swiper } from 'swiper';

import Actions from './components/Actions';
import BackdropViewer from './components/BackdropViewer';
import Gallery from './components/Gallery';
import PhotoViewer from './components/PhotoViewer';
import VideoViewer from './components/VideoViewer';
import Viewer from './components/Viewer';
import { MediaViewerProps, NavigationDirection, MediaViewerType, MediaViewerData } from './types';

const MediaViewer = (props: MediaViewerProps): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen: isGalleryOpen, onOpen: onGalleryOpen, onClose: onGalleryClose } = useDisclosure();

  const { isOpen, name, selected, photos, backdrops, videos, mediaType, onClose } = props;

  const [swiper, setSwiper] = useState<Swiper>();

  const [activePath, setActivePath] = useState<string>('');
  const [activeType, setActiveType] = useState<MediaViewerType>();

  const data: MediaViewerData[] = [...(photos || []), ...(backdrops || []), ...(videos || [])];

  /**
   * This method will slide to the image
   *
   * @param index Number - The index of the image in the list
   */
  const handleSlideTo = useCallback(
    (index: number) => {
      if (swiper) {
        swiper.slideTo(index, 0);
      }
    },
    [swiper]
  );

  /**
   * This method will either slide to the previous slide or to the next slide depending on the direction passed
   *
   * @param direction - Either 'prev' or 'next'
   */
  const handleNavigation = useCallback(
    (direction: NavigationDirection): void => {
      switch (direction) {
        case 'prev': {
          if (swiper?.allowSlidePrev || false) {
            swiper.slidePrev(500);
          }
          break;
        }
        case 'next': {
          if (swiper?.allowSlideNext || false) {
            swiper.slideNext(500);
          }
          break;
        }
        default:
          break;
      }
    },
    [swiper]
  );

  /**
   * This method will set the active path and active type on every change
   */
  const handleSlideChange = useCallback(
    (swiper: Swiper) => {
      const item = data.find((_item, index) => index === swiper.activeIndex);
      const path = item?.file_path || item?.key || '';
      const type = photos?.some((image) => image.file_path === path)
        ? 'photo'
        : backdrops?.some((image) => image.file_path === path)
        ? 'backdrop'
        : videos?.some((video) => video.key === path)
        ? 'video'
        : '';

      if (path) {
        setActivePath(path);
      }

      if (type) {
        setActiveType(type);
      }
    },
    [data, photos, backdrops, videos, setActivePath, setActiveType]
  );

  /**
   * This method will close the gallery and display the file
   *
   * @param path - The URL path
   * @param type - The type of path
   */
  const handleGalleryClick = (path: string, type: MediaViewerType): void => {
    const index = data.findIndex((item) => item.file_path === path || item.key === path);

    setActivePath(path);
    setActiveType(type);

    handleSlideTo(index);

    onGalleryClose();
  };

  useEffect(() => {
    if (swiper && selected && selected.asset && selected.type && data && data.length > 0) {
      setActivePath(selected.asset);
      setActiveType(selected.type);

      handleSlideTo(data?.findIndex((item) => item.file_path === selected.asset || item.key === selected.asset) || 0);
    }
  }, [swiper, selected]);

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
            {/* Actions */}
            <Actions activeType={activeType} onClose={onClose} onGalleryClick={() => onGalleryOpen()} />

            {/* Photo, Backdrop & Video Viewer */}
            <Viewer
              renderSlide={(slide: MediaViewerData) =>
                activeType === 'photo' ? (
                  <PhotoViewer name={name} path={slide.file_path} mediaType={mediaType} />
                ) : activeType === 'backdrop' ? (
                  <BackdropViewer name={name} path={slide.file_path} mediaType={mediaType} />
                ) : (
                  <VideoViewer path={slide.key} />
                )
              }
              isGalleryOpen={isGalleryOpen}
              activePath={activePath}
              data={data}
              onSwiper={(swiper) => setSwiper(swiper)}
              onSlideChange={handleSlideChange}
              onNavigation={handleNavigation}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Gallery
        isOpen={isGalleryOpen}
        activePath={activePath}
        name={name}
        photos={photos}
        backdrops={backdrops}
        videos={videos}
        mediaType={mediaType}
        onClick={handleGalleryClick}
        onClose={onGalleryClose}
      />
    </>
  );
};

export default MediaViewer;
