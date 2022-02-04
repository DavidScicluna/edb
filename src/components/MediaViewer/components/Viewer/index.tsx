import { ReactElement, useState, useCallback, useEffect } from 'react';

import { useTheme, Center, SlideFade } from '@chakra-ui/react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { useEventListener } from 'usehooks-ts';

import {
  handleIsTouchDevice,
  handleParseDurationForFramer,
  handleConvertStringToNumber
} from '../../../../common/utils';
import { Theme } from '../../../../theme/types';
import Navigation from './components/Navigation';
import { ViewerProps, SwiperDirection, ViewerEvent } from './types';

const Viewer = (props: ViewerProps): ReactElement => {
  const theme = useTheme<Theme>();

  const {
    mediaItems = [],
    activeMediaItem,
    isDisabled = false,
    renderSlide,
    onSwiper,
    onSlideChange,
    onNavigation,
    onSwipeVertical
  } = props;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  /**
   * This method will either navigate to the left/right depending on the key pressed
   */
  const handleKeyPress = useCallback(
    (event: ViewerEvent): void => {
      if (!isDisabled && event && event?.key) {
        switch (event.key) {
          case 'ArrowLeft':
            onNavigation('prev');
            break;
          case 'ArrowRight':
            onNavigation('next');
            break;
          default:
            break;
        }
      }
    },
    [isDisabled, onNavigation]
  );

  /**
   * This method will set the active index depending on the activeMediaItem
   */
  const handleSetActiveIndex = useCallback(() => {
    setActiveIndex(
      (mediaItems.findIndex(
        (mediaItem) =>
          mediaItem.data.file_path === activeMediaItem.data.file_path || mediaItem.data.key === activeMediaItem.data.key
      ) || 0) + 1
    );
  }, [mediaItems, activeMediaItem, setActiveIndex]);

  /**
   * This method will close the modal if user is on touch device
   * And user swipes either up/down
   *
   * @param Swiper - Swiper data object
   */
  const handleSwipe = (swiper: SwiperDirection): void => {
    if (handleIsTouchDevice() && swiper.swipeDirection === undefined) {
      onSwipeVertical();
    }
  };

  useEventListener('keydown', handleKeyPress);

  useEffect(() => handleSetActiveIndex(), [activeMediaItem]);

  return (
    <>
      <Swiper
        allowSlideNext={activeIndex <= mediaItems.length}
        allowSlidePrev={activeIndex >= 1}
        spaceBetween={96}
        slidesPerView={1}
        onUpdate={(swiper) => onSwiper(swiper)}
        onSwiper={(swiper) => onSwiper(swiper)}
        onSlideChange={(swiper) => onSlideChange(swiper)}
        onTouchEnd={(swiper: SwiperType) => handleSwipe(swiper)}
      >
        {mediaItems.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideFade
              in={activeIndex - 1 === index}
              offsetY='15vh'
              delay={handleParseDurationForFramer(handleConvertStringToNumber(theme.transition.duration.slow, 'ms'))}
              unmountOnExit
            >
              <Center width='100vw' height='100vh' position='relative'>
                {renderSlide(slide)}
              </Center>
            </SlideFade>
          </SwiperSlide>
        ))}
      </Swiper>

      <Navigation current={activeIndex} total={mediaItems.length} onNavigation={onNavigation} />
    </>
  );
};

export default Viewer;
