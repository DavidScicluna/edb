import { ImageProps } from '../Image/types';

export type AvatarRef = HTMLDivElement | null;

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = {
	isLoading?: boolean;
	size?: Size;
	src: ImageProps['fullSrc'];
} & Omit<ImageProps, 'boringType' | 'thumbnailSrc' | 'fullSrc'>;
