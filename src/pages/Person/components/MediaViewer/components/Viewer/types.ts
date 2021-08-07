import { Swiper } from 'swiper';

import { Image as ImageType } from '../../../../../../common/types/person';

export type ViewerProps = {
  name?: string;
  images: ImageType[];
  onSwiper: (swiper: Swiper) => void;
  onSlideChange: (swiper: Swiper) => void;
};
