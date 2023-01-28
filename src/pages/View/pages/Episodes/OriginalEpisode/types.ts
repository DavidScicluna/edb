import { TabsOnChangeProps } from '@davidscicluna/component-library';

import { ViewParams } from '../../../common/types';
import { UseMediaTypeQueryResult } from '../../../../../common/queries/useMediaTypeQuery';
import { UseTVShowEpisodeQueryResult } from '../../../../../common/queries/useTVShowEpisodeQuery';
import { UseTVShowEpisodeCreditsQueryResult } from '../../../../../common/queries/useTVShowEpisodeCreditsQuery';
import { UseTVShowEpisodeImagesQueryResult } from '../../../../../common/queries/useTVShowEpisodeImagesQuery';
import { UseTVShowEpisodeVideosQueryResult } from '../../../../../common/queries/useTVShowEpisodeVideosQuery';

export type EpisodeParams = ViewParams & {
	season: string;
	episode: string;
};

export type EpisodeContext = {
	showQuery?: UseMediaTypeQueryResult<'tv'>;
	episodeQuery?: UseTVShowEpisodeQueryResult;
	creditsQuery?: UseTVShowEpisodeCreditsQueryResult;
	imagesQuery?: UseTVShowEpisodeImagesQueryResult;
	videosQuery?: UseTVShowEpisodeVideosQueryResult;
	onSetActiveTab: (props: TabsOnChangeProps) => void;
};
