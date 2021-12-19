import { UseQueryResult } from 'react-query';

import { Collection, Images, Videos } from '../../../../../common/types';
import { FullMovie, Credits, PartialMovie } from '../../../../../common/types/movie';
import { MediaViewerType } from '../../../../../components/MediaViewer/types';

export type HomeTabProps = {
  movieQuery: UseQueryResult<FullMovie>;
  creditsQuery: UseQueryResult<Credits>;
  imagesQuery: UseQueryResult<Images>;
  videosQuery: UseQueryResult<Videos>;
  collectionsQuery: UseQueryResult<Collection>;
  recommendationsQuery: UseQueryResult<PartialMovie[]>;
  onCoverClick: (path: string, type: MediaViewerType) => void;
  onMediaClick: (asset: string, type: MediaViewerType) => void;
  onChangeTab: (index: number) => void;
};
