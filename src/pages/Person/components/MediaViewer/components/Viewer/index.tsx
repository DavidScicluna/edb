import React, { ReactElement } from 'react';

import { useMediaQuery, Center, Image, AspectRatio } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

import utils from '../../../../../../common/utils/utils';
import { ViewerProps } from './types';

const Viewer = (props: ViewerProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 480px)');

  const { name, images, onSwiper, onSlideChange } = props;

  return (
    <Swiper
      spaceBetween={96}
      slidesPerView={1}
      onSwiper={(swiper) => onSwiper(swiper)}
      onSlideChange={(swiper) => onSlideChange(swiper)}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Center width='100vw' height='100vh' py={2}>
            <Image
              alt={`${name ? `"${name}"` : ''} image`}
              width={isSm ? 'calc(100% - 64px)' : 'auto'}
              maxWidth='none'
              height={isSm ? 'auto' : 'calc(100% - 128px)'}
              borderRadius='xl'
              src={`${process.env.REACT_APP_IMAGE_URL}/original${image.file_path}`}
              fallbackSrc={utils.handleReturnFallbackSrc('person', '780', `${name ? `"${name}"` : ''} image`)}
            />
          </Center>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Viewer;
