import { ReactElement } from 'react';

import { Swiper } from 'swiper';

import { MediaItem, NavigationDirection } from '../../types';

export type ViewerEvent = any;

export type SwiperDirection = { swipeDirection?: NavigationDirection } & Swiper;

export type ViewerProps = {
	activeIndex?: number;
	mediaItems: MediaItem[];
	isDisabled: boolean;
	renderSlide: (slide: MediaItem) => ReactElement;
	onSwiper: (swiper: Swiper) => void;
	onSlideChange: (swiper: Swiper) => void;
	onSwipeVertical: () => void;
	onNavigation: (direction: NavigationDirection) => void;
};
