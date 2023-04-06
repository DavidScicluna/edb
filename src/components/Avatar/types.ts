import { ImageProps } from '@davidscicluna/component-library';

export type AvatarProps = ImageProps & {
	isLoading?: boolean;
	size?: string;
};

export type AvatarRef = HTMLDivElement | null;
