import { MediaType, Video } from '../../../../../common/types';

export type ViewVideosMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type ViewVideosVideo = Video;
export type ViewVideosVideos = ViewVideosVideo[];

export type ViewVideosProps = {
	mediaType: ViewVideosMediaType;
	videos: ViewVideosVideos;
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
