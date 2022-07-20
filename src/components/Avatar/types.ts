import { FontSize } from '@davidscicluna/component-library';

import { ImageProps } from '../Image/types';

export type AvatarSize = FontSize;

export type AvatarProps = ImageProps & {
	isLoading?: boolean;
	size?: AvatarSize;
};

export type AvatarRef = HTMLDivElement | null;
