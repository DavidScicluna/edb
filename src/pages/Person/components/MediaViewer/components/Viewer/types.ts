import { Swiper } from 'swiper';

import { Profile } from '../../../../../../common/types/person';

export type ViewerProps = {
  current: number;
  name?: string;
  images: Profile[];
  onSwiper: (swiper: Swiper) => void;
  onSlideChange: (swiper: Swiper) => void;
};
