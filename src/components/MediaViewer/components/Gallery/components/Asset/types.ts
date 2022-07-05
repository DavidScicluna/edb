import { AccordionType } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

import { Asset } from '../../../../types';
import { GalleryProps } from '../../types';

export type AssetProps = {
	title?: string;
	colorMode: ColorMode;
	data: AccordionType<Asset['mediaItems']>['data'];
} & Omit<GalleryProps, 'assets' | 'isOpen' | 'onClose'>;
