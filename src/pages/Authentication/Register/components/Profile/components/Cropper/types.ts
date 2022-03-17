import { ProfileProps } from '../../types';

type CropperType = 'avatar' | 'background';

export type CropperProps = {
	type: CropperType;
	image?: string;
	isOpen?: boolean;
	onCrop: (image: string) => void;
	onClose: () => void;
} & Omit<ProfileProps, 'id' | 'form' | 'user'>;
