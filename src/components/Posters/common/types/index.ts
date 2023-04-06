import { ImageSrcMode } from '@davidscicluna/component-library';

export type PosterImage = {
	alt: string;
	src: string;
	size: Record<Exclude<ImageSrcMode, 'boring'>, string>;
};
