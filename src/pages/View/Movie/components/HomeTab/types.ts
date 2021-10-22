import { UseQueryResult } from 'react-query';

import { FullMovie, Credits, PartialMovie } from '../../../../../common/types/movie';
import { Collection as CollectionType, Images, Videos } from '../../../../../common/types/types';
import { MediaViewerType } from '../../../../../components/MediaViewer/types';

export type HomeTabProps = {
  movieQuery: UseQueryResult<FullMovie>;
  creditsQuery: UseQueryResult<Credits>;
  imagesQuery: UseQueryResult<Images>;
  videosQuery: UseQueryResult<Videos>;
  collectionsQuery: UseQueryResult<CollectionType>;
  recommendationsQuery: UseQueryResult<PartialMovie[]>;
  onCoverClick: (path: string, type: MediaViewerType) => void;
  onMediaClick: (asset: string, type: MediaViewerType) => void;
  onChangeTab: (index: number) => void;
};
