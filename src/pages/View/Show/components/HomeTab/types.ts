import { UseQueryResult } from 'react-query';

import { Images, Videos } from '../../../../../common/types';
import { FullTV, Credits, PartialTV } from '../../../../../common/types/tv';
import { MediaViewerType } from '../../../../../components/MediaViewer/types';

export type HomeTabProps = {
  tvShowQuery: UseQueryResult<FullTV>;
  creditsQuery: UseQueryResult<Credits>;
  imagesQuery: UseQueryResult<Images>;
  videosQuery: UseQueryResult<Videos>;
  recommendationsQuery: UseQueryResult<PartialTV[]>;
  onCoverClick: (path: string, type: MediaViewerType) => void;
  onMediaClick: (asset: string, type: MediaViewerType) => void;
  onChangeTab: (index: number) => void;
};
