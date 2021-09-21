import { UseQueryResult } from 'react-query';

import { FullMovie, Credits, ImageResponse, VideoResponse, PartialMovie } from '../../../../common/types/movie';
import { Collection as CollectionType } from '../../../../common/types/types';
import { MediaViewerType } from '../../../../components/MediaViewer/types';

export type HomeTabProps = {
  movieQuery: UseQueryResult<FullMovie>;
  creditsQuery: UseQueryResult<Credits>;
  imagesQuery: UseQueryResult<ImageResponse>;
  videosQuery: UseQueryResult<VideoResponse>;
  collectionsQuery: UseQueryResult<CollectionType>;
  recommendationsQuery: UseQueryResult<PartialMovie[]>;
  onCoverClick: (path: string, type: MediaViewerType) => void;
  onMediaClick: (asset: string, type: MediaViewerType) => void;
  onChangeTab: (index: number) => void;
};
