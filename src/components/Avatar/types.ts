import { ImageProps } from '../Image/types';

export type AvatarProps = ImageProps & {
	isLoading?: boolean;
	size?: string;
};

export type AvatarRef = HTMLDivElement | null;
