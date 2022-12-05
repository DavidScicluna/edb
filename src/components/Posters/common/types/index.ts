import { MouseEvent as ME } from 'react';

import { ImageSrcMode } from '../../../Image/types';

export type PosterMouseEvent = ME<HTMLButtonElement, globalThis.MouseEvent>;

export type PosterImage = {
	alt: string;
	src: string;
	size: Record<Exclude<ImageSrcMode, 'boring'>, string>;
};
