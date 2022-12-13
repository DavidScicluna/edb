import { ViewVideosVideo, ViewVideosProps } from '../../types';

export type ViewVideosVideoProps = Pick<ViewVideosProps, 'mediaType'> & {
	index: number;
	video: ViewVideosVideo;
};
