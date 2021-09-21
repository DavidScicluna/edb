import { ViewerProps } from '../Viewer/types';

export type NavigationProps = {
  current: number;
  total: number;
} & Omit<
  ViewerProps,
  | 'activePath'
  | 'renderSlide'
  | 'isGalleryOpen'
  | 'activeIndex'
  | 'name'
  | 'data'
  | 'onSwiper'
  | 'onSlideChange'
  | 'onClose'
>;
