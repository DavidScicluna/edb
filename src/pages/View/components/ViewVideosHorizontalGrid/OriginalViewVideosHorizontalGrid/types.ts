import { MediaType, Video } from '../../../../../common/types';

export type ViewVideosHorizontalGridMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type ViewVideosHorizontalGridVideo = Video;
export type ViewVideosHorizontalGridVideos = ViewVideosHorizontalGridVideo[];

export type ViewVideosHorizontalGridProps = {
	mediaType: ViewVideosHorizontalGridMediaType;
	videos: ViewVideosHorizontalGridVideos;
	// dummyVideos: ;
	title?: string;
	subtitle?: string;
	emptyLabel: string;
	total?: number;
	isLoading?: boolean;
	isError?: boolean;
	isSuccess?: boolean;
	onFooterClick: () => void;
};
