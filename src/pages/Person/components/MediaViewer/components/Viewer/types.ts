import { Swiper } from 'swiper';

import { Image as ImageType } from '../../../../../../common/types/person';

export type ViewerProps = {
  current: number;
  name?: string;
  images: ImageType[];
  onSwiper: (swiper: Swiper) => void;
  onSlideChange: (swiper: Swiper) => void;
};
