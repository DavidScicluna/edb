import { MediaType, Video } from '../../../../../../common/types';

export type ViewVideosVideoMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type ViewVideosVideoProps = {
	mediaType: ViewVideosVideoMediaType;
	index: number;
	video: Video;
};
