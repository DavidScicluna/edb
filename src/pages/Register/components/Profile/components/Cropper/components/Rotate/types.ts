import { CropperProps } from '../../types';

export type RotateProps = {
	rotation: number;
	onRotation: (rotation: number) => void;
} & Omit<CropperProps, 'type' | 'image' | 'isOpen' | 'onCrop' | 'onClose' | 'color'>;
