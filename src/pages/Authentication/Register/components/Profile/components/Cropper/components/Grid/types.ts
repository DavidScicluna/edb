import { CropperProps } from '../../types';

export type GridProps = {
	isActive?: boolean;
	onToggle: () => void;
} & Omit<CropperProps, 'type' | 'image' | 'isOpen' | 'onCrop' | 'onClose' | 'color'>;
