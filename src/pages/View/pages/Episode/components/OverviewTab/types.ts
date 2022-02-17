import { UseQueryResult } from 'react-query';

import { Images, Videos } from '../../../../../../common/types';
import { FullTV, Episode, EpisodeCredits } from '../../../../../../common/types/tv';
import { AssetType } from '../../../../../../components/MediaViewer/types';

export type OverviewTabProps = {
	tvShowQuery: UseQueryResult<FullTV>;
	episodeQuery: UseQueryResult<Episode>;
	creditsQuery: UseQueryResult<EpisodeCredits>;
	imagesQuery: UseQueryResult<Images>;
	videosQuery: UseQueryResult<Videos>;
	onAssetClick: (path: string, type: AssetType) => void;
	onChangeTab: (index: number) => void;
};
