import { MediaType, Video } from '../../../../../../common/types';

export type ViewVideosMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type ViewVideosVideo = Video;
export type ViewVideosVideos = ViewVideosVideo[];
