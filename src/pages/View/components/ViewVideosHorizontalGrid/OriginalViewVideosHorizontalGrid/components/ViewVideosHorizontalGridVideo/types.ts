import { ViewVideosHorizontalGridVideo, ViewVideosHorizontalGridProps } from '../../types';

export type ViewVideosHorizontalGridVideoProps = Pick<ViewVideosHorizontalGridProps, 'mediaType'> & {
	index: number;
	video: ViewVideosHorizontalGridVideo;
};
