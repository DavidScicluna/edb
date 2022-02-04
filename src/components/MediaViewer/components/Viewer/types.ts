import { ReactElement } from 'react';

import { Swiper } from 'swiper';

import { MediaItem, NavigationDirection } from '../../types';

export type ViewerEvent = any;

export type SwiperDirection = { swipeDirection?: NavigationDirection } & Swiper;

export type ViewerProps = {
  mediaItems: MediaItem[];
  activeMediaItem: MediaItem;
  isDisabled: boolean;
  renderSlide: (slide: MediaItem) => ReactElement;
  onSwiper: (swiper: Swiper) => void;
  onSlideChange: (swiper: Swiper) => void;
  onSwipeVertical: () => void;
  onNavigation: (direction: NavigationDirection) => void;
};
