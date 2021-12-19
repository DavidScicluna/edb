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
import Navigation from '../Navigation';
import { ViewerProps, SwiperDirection, ViewerEvent } from './types';

const Viewer = (props: ViewerProps): ReactElement => {
  const theme = useTheme<Theme>();

  const { renderSlide, isGalleryOpen, activePath, data, onSwiper, onSlideChange, onNavigation, onClose } = props;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  /**
   * This method will either navigate to the left/right depending on the key pressed
   * And depending if its allowed to navigate left/right
   */
  const handleKeyPress = useCallback(
    (event: ViewerEvent): void => {
      if (!isGalleryOpen) {
        switch (event?.key) {
          case 'ArrowLeft': {
            if (activeIndex >= 1) {
              onNavigation('prev');
            }
            break;
          }
          case 'ArrowRight': {
            if (activeIndex <= (data?.length || 0)) {
              onNavigation('next');
            }
            break;
          }
          default:
            break;
        }
      }
    },
    [isGalleryOpen, data, activePath, onNavigation]
  );

  /**
   * This method will set the active index depending on the activePath
   */
  const handleSetActiveIndex = useCallback(() => {
    setActiveIndex((data.findIndex((item) => item.file_path === activePath || item.key === activePath) || 0) + 1);
  }, [data, activePath, setActiveIndex]);

  /**
   * This method will close the modal if user is on touch device
   * And user swipes either up/down
   *
   * @param Swiper - Swiper data object
   */
  const handleSwipe = (swiper: SwiperDirection): void => {
    if (handleIsTouchDevice() && swiper.swipeDirection === undefined) {
      onClose();
    }
  };

  useEventListener('keydown', handleKeyPress);

  useEffect(() => handleSetActiveIndex(), [activePath]);

  return (
    <>
      <Swiper
        allowSlideNext={activeIndex <= (data?.length || 0)}
        allowSlidePrev={activeIndex >= 1}
        spaceBetween={96}
        slidesPerView={1}
        onUpdate={(swiper) => onSwiper(swiper)}
        onSwiper={(swiper) => onSwiper(swiper)}
        onSlideChange={(swiper) => onSlideChange(swiper)}
        onTouchEnd={(swiper: SwiperType) => handleSwipe(swiper)}>
        {data?.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideFade
              in={activeIndex - 1 === index}
              offsetY='10vh'
              delay={handleParseDurationForFramer(handleConvertStringToNumber(theme.transition.duration.slow, 'ms'))}
              unmountOnExit>
              <Center width='100vw' height='100vh' position='relative'>
                {renderSlide(slide)}
              </Center>
            </SlideFade>
          </SwiperSlide>
        ))}
      </Swiper>

      <Navigation current={activeIndex} total={data?.length || 0} onNavigation={onNavigation} />
    </>
  );
};

export default Viewer;
