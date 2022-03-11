import { ColorMode } from '@chakra-ui/react';

import { Accordion } from '../../../../../Accordions/types';
import { Asset } from '../../../../types';
import { GalleryProps } from '../../types';

export type AssetProps = {
	title?: string;
	colorMode: ColorMode;
	data: Accordion<Asset['mediaItems']>['data'];
} & Omit<GalleryProps, 'assets' | 'isOpen' | 'onClose'>;
