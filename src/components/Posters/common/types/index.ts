import { ImageSrcMode } from '../../../Image/types';

export type PosterImage = {
	alt: string;
	src: string;
	size: Record<Exclude<ImageSrcMode, 'boring'>, string>;
};
