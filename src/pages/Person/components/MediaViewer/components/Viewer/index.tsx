import React, { ReactElement } from 'react';

import { useMediaQuery, Center } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

import Image from '../../../../../../components/Image';
import { ViewerProps } from './types';

const Viewer = (props: ViewerProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 480px)');

  const { current, name, images, onSwiper, onSlideChange } = props;

  return (
    <Swiper
      allowSlideNext={current <= images.length}
      allowSlidePrev={current >= 1}
      spaceBetween={96}
      slidesPerView={1}
      onSwiper={(swiper) => onSwiper(swiper)}
      onSlideChange={(swiper) => onSlideChange(swiper)}
      onKeyPress={(event) => console.log(event)}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Center width='100vw' height='100vh' py={2}>
            <Image
              alt={`${name ? `"${name}"` : ''} image`}
              width={isSm ? 'calc(100% - 64px)' : 'auto'}
              maxWidth='none'
              height={isSm ? 'auto' : 'calc(100% - 128px)'}
              mediaType='person'
              borderRadius='xl'
              src={image.file_path}
              size={{
                thumbnail: 'w45',
                full: 'original'
              }}
            />
          </Center>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Viewer;
