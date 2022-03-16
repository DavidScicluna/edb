import { CropperProps } from '../../types';

export type ZoomProps = {
	zoom: number;
	onSetZoom: (zoom: number) => void;
} & Omit<CropperProps, 'type' | 'image' | 'isOpen' | 'onCrop' | 'onClose' | 'color'>;
