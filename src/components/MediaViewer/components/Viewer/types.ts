import { ReactElement } from 'react';

import { Swiper } from 'swiper';

import { NavigationDirection, MediaViewerProps, MediaViewerData } from '../../types';

export type SwiperDirection = { swipeDirection?: NavigationDirection } & Swiper;

export type ViewerProps = {
  renderSlide: (slide: MediaViewerData) => ReactElement;
  isGalleryOpen: boolean;
  activePath: string;
  data: MediaViewerData[];
  onSwiper: (swiper: Swiper) => void;
  onSlideChange: (swiper: Swiper) => void;
  onNavigation: (direction: NavigationDirection) => void;
} & Omit<MediaViewerProps, 'name' | 'isOpen' | 'selected' | 'photos' | 'backdrops' | 'videos' | 'mediaType'>;
