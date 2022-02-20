import { ViewerProps } from '../../../Viewer/types';

export type NavigationProps = {
	current: number;
	total: number;
} & Omit<
	ViewerProps,
	'mediaItems' | 'activeMediaItem' | 'isDisabled' | 'renderSlide' | 'onSwiper' | 'onSlideChange' | 'onSwipeVertical'
>;
