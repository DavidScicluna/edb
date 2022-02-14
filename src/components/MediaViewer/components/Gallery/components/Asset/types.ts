import { Image, Video } from '../../../../../../common/types';
import { Accordion } from '../../../../../Accordions/types';
import { Asset } from '../../../../types';
import { GalleryProps } from '../../types';

export type AssetProps = {
  data: Accordion<Asset['mediaItems']>['data'];
  title?: string;
} & Omit<GalleryProps, 'assets' | 'isOpen' | 'onClose'>;
