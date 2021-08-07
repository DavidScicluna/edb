import React, { ReactElement } from 'react';

import { Center, Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

import utils from '../../../../../../common/utils/utils';
import { ViewerProps } from './types';

const Viewer = (props: ViewerProps): ReactElement => {
  const { name, images, onSwiper, onSlideChange } = props;

  return (
    <Swiper
      spaceBetween={96}
      slidesPerView={1}
      onSwiper={(swiper) => onSwiper(swiper)}
      onSlideChange={(swiper) => onSlideChange(swiper)}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Center height='100vh' py={2}>
            <Image
              alt={`${name ? `"${name}"` : ''} image`}
              width='auto'
              maxWidth='none'
              height='calc(100% - 96px)'
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
